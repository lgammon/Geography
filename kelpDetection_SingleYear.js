var sanMiguel = sanMiguel2, BigSur = BigSur2, AOI = AOI2, water = water2, kelp = kelp2, forest = forest2, geometry = geometry2;

// Function to process Sentinel-2 images with cloud and B11 masking
function processSentinel2(year, region, visualize) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-07-31");

    // Load Sentinel-2 image collection
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
        .filterDate(startDate, endDate) // Filter by date
        .filterBounds(sanMiguel) // Filter by region
        .sort('CLOUDY_PIXEL_PERCENTAGE') // Sort images by cloud cover (ascending)
        .limit(ee.Number(ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
            .filterDate(startDate, endDate)
            .filterBounds(region)
            .size()).multiply(0.6).int()); // Keep only the least cloudy 30% of images

    // Function to mask clouds using the QA60 band
    function maskClouds(image) {
        var cloudMask = image.select('QA60').bitwiseAnd(1 << 10).eq(0); // Cloud mask from QA60
        return image.updateMask(cloudMask);
    }

    // Function to mask out values over 0.028 in Band 11 (B11)
    function maskB11(image) {
        var mask = image.select('B11').lte(1000); // Keep pixels where B11 <= 1000
        return image.updateMask(mask);
    }

    // Apply cloud and B11 masks
    var maskedCollection = imageCollection.map(maskClouds).map(maskB11);

    // Create a composite of all cloud-free images over the AOI
    var composite = maskedCollection.median();
    
    if (visualize) {
        var NDVI = composite.normalizedDifference(["B8", "B4"]).rename("NDVI");
        Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");
    
        var FAI = composite.expression(    
            '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
            {
                B8: composite.select('B8'),
                B4: composite.select('B4'),
                B11: composite.select('B11')
            }
        ).rename('FAI');
        Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']}, year + " FAI");
    
        var KD = composite.expression(
            '(r6 - b4)',
            {
                b4: composite.select('B4'),
                r6: composite.select('B6')
            }
        ).rename('KD');
        Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']}, year + " KD");
    }
    
    return composite;
}

// Set the classification mode: true for single-year, false for multi-year
var singleYearMode = true;
var selectedYear = 2020; // Choose the single year to classify

// Process Sentinel-2 for single-year or multi-year
var composite;
if (singleYearMode) {
    composite = processSentinel2(selectedYear, AOI, true);
} else {
    function createMultiYearComposite(years, region) {
        var composites = years.map(function(year) {
            return processSentinel2(year, region, false);
        });

        var multiYearComposite = ee.ImageCollection(composites).median();

        Map.addLayer(multiYearComposite, {bands: ["B4", "B3", "B2"], min: 0, max: 3000}, "Multi-Year Composite");

        return multiYearComposite;
    }

    composite = createMultiYearComposite([2019, 2020, 2021], AOI);
}

// Merge training data
var classNames = water.merge(kelp);
print(classNames);

// Extract training data from select bands
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8','B11'];
var training = composite.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);

// Train classifier
var classifier = ee.Classifier.libsvm().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});

// Run classification
var classified = composite.select(bands).classify(classifier);

// Add classification layer
Map.addLayer(classified, {min: 0, max: 2, palette: ['blue', 'green']}, 'Classification');

// Validation
var valNames = water.merge(kelp);
var validation = classified.sampleRegions({
  collection: valNames,
  properties: ['landcover'],
  scale: 30,
});
print(validation);

var testAccuracy = validation.errorMatrix('landcover', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());

// Export classified image
Export.image.toDrive({
  image: classified,
  description: 'classified_' + (singleYearMode ? selectedYear : 'multiYear'),
  scale: 10,
  region: AOI,
  folder: '',
  fileFormat: 'GeoTIFF'
});
