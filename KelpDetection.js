

var AOI = 
    /* color: #b00b1e */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-122.02595780861449, 36.40194656170591],
          [-122.02595780861449, 35.91853281686468],
          [-121.35579179298949, 35.91853281686468],
          [-121.35579179298949, 36.40194656170591]]], null, false),
    imageCollection = ee.ImageCollection("COPERNICUS/S2_HARMONIZED"),
    cloudscore = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED"),
    water = /* color: #d63000 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-121.72477844347537, 36.15100992166214]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.68787124743045, 36.16043487298336]),
            {
              "landcover": 0,
              "system:index": "1"
            })]),
    kelp = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-121.68718460192264, 36.16736426147979]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.68649795641483, 36.16722567971289]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.69314983477176, 36.17089801374621]),
            {
              "landcover": 1,
              "system:index": "2"
            })]),
    forest = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-121.681305199762, 36.171486956966504]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.6774080928715, 36.172759415205114]),
            {
              "landcover": 2,
              "system:index": "1"
            })]);
// Function to process Sentinel-2 images and compute histograms
function processSentinel2(year, region, visualize) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-07-31");

    // Cloud Score+ collection
    var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
    var QA_BAND = 'cs'; // Use 'cs' or 'cs_cdf'
    var CLEAR_THRESHOLD = 0.20; // Cloud masking threshold

    // Function to mask clouds using Cloud Score+
    function maskClouds(image) {
        var cloudMask = csPlus
            .filterBounds(image.geometry())
            .filterDate(image.date(), image.date().advance(1, 'day'))
            .median()
            .select(QA_BAND)
            .gte(CLEAR_THRESHOLD);
        
        return image.updateMask(cloudMask);
    }
    
    // Function to mask out values over 0.028 in Band 11 (B11)
    function maskB11(image) {
        var mask = image.select('B11').lte(1000); // Keep pixels where B11 <= 1000
        return image.updateMask(mask);
    }

    // Load Sentinel-2 image collection for the given year
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
        .filterDate(startDate, endDate) // Filter by date
        .filterBounds(region) // Filter by region
        .linkCollection(csPlus, [QA_BAND])
        .map(maskClouds) // Apply cloud mask
        .map(maskB11);

    // Create a composite of all cloud-free images over the AOI
    var composite = imageCollection.mean();
    
    if (visualize) {
        var NDVI = composite.expression(
            "(NIR - RED) / (NIR + RED)",
            {
                RED: composite.select("B4"),
                NIR: composite.select("B8")
            }
        );
        Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");
    
        var FAI = composite.expression(
            '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
            {
                B8: composite.select('B8'),
                B4: composite.select('B4'),
                B11: composite.select('B11')
            }
        ).rename('FAI');
        Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']},  year + " FAI");
    
        var KD = composite.expression(
            '(r6 - b4)',
            {
                b4: composite.select('B4'),
                r6: composite.select('B6')
            }
        ).rename('KD');
        Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']},  year + " KD");

    }
    
    return composite;
}

// Function to create a multi-year median composite for all indices
function createMultiYearComposite(years, region) {
    var composites = years.map(function(year) {
        return processSentinel2(year, region, false);
    });

    var multiYearComposite = ee.ImageCollection(composites).median();
    
    
    
    // Compute and add NDVI, FAI, and KD only for the multi-year composite
    var NDVI = multiYearComposite.expression(
        "(NIR - RED) / (NIR + RED)",
        {
            RED: multiYearComposite.select("B4"),
            NIR: multiYearComposite.select("B8")
        }
    );
    Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, "Multi-Year Median NDVI");

    var FAI = multiYearComposite.expression(
        '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
        {
            B8: multiYearComposite.select('B8'),
            B4: multiYearComposite.select('B4'),
            B11: multiYearComposite.select('B11')
        }
    ).rename('FAI');
    Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']}, "Multi-Year Median FAI");

    var KD = multiYearComposite.expression(
        '(r6 - b4)',
        {
            b4: multiYearComposite.select('B4'),
            r6: multiYearComposite.select('B6')
        }
    ).rename('KD');
    Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']}, "Multi-Year Median KD");

    return multiYearComposite;
}
// Set the area of interest
Map.centerObject(AOI,11);

// Example: Call the function for a single year visualization
//processSentinel2(2016, AOI, true);
//processSentinel2(2017, AOI, true);
//processSentinel2(2018, AOI, true);
//processSentinel2(2019, AOI, true);
processSentinel2(2020, AOI, true);
//processSentinel2(2021, AOI, true);
//processSentinel2(2022, AOI, true);
//processSentinel2(2024, AOI, true);

// Example: Call the function for a multi-year median composite (2019-2021)
var multiYearComposite = createMultiYearComposite([2019, 2020, 2021], AOI);

//Merge into one FeatureCollection and print details to consloe
var classNames = water.merge(kelp).merge(forest);
print(classNames);

//Extract training data from select bands of the image, print to console
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = multiYearComposite.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);

//Train classifier - e.g. cart, randomForest, svm
var classifier = ee.Classifier.libsvm().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});

//Run the classification
var classified = multiYearComposite.select(bands).classify(classifier);

//Centre the map on your training data coverage
//Map.centerObject(classNames, 11);
//Add the classification to the map view, specify colours for classes
Map.addLayer(classified,
{min: 0, max: 1, palette: ['blue', 'red', 'green']},
'classification');

var valNames = water.merge(kelp).merge(forest);

var validation = classified.sampleRegions({
  collection: valNames,
  properties: ['landcover'],
  scale: 30,
});
print(validation);

//Compare the landcover of your validation data against the classification result
var testAccuracy = validation.errorMatrix('landcover', 'classification');
//Print the error matrix to the console
print('Validation error matrix: ', testAccuracy);
//Print the overall accuracy to the console
print('Validation overall accuracy: ', testAccuracy.accuracy());
