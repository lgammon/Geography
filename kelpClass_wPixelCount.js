var bigsur = /* color: #98ff00 */geometry2,
    sanmiguel = /* color: #0b4a8b */geometry3,
    AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-122.70653052683309, 36.39253423540982],
          [-122.70653052683309, 33.75858660387359],
          [-119.97093482370809, 33.75858660387359],
          [-119.97093482370809, 36.39253423540982]]], null, false),
    water = 
    /* color: #271eff */
    /* shown: false */
    geometry5,
    kelp = 
    /* color: #9cd167 */
    /* shown: false */
    geometry6,
    forest = 
    /* color: #3fb015 */
    /* shown: false */
    ee.FeatureCollection([]),
    geometry = 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.MultiPoint();
    
    
// Function to create a multi-year median composite for all indices
function createMultiYearComposite(years, region) {
    var composites = years.map(function(year) {
        return processSingleYear(year, region, false); // Process each year
    });

    // Create a multi-year median composite
    var multiYearComposite = ee.ImageCollection(composites).median();
    
    return multiYearComposite;
}

// Function to process a single year of Sentinel-2 images and clip the classification result to Big Sur
function processSingleYear(year, region, visualize) {
    // Define the date range for the given year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-08-20");

    // Load Sentinel-2 image collection for the given year
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
        .filterDate(startDate, endDate) // Filter by date
        .filterBounds(region) // Filter by region

    // Function to mask clouds using cloud probability (thresholded)
    function maskClouds(image) {
        var cloudProb = image.select('QA60'); // Get cloud probability band
        var cloudMask = cloudProb.gte(0.5); // Threshold to detect clouds (adjust as needed)
        return image.updateMask(cloudMask.not()); // Invert mask to keep cloud-free pixels
    }
    
        // Function to mask out values over 0.028 in Band 11 (B11)
    function maskB11(image) {
        var mask = image.select('B11').lte(1000); // Keep pixels where B11 <= 1000
        return image.updateMask(mask);
    }
    
    // Apply cloud and cloud shadow masking
    var processedImageCollection = imageCollection
        .map(maskClouds)   // Apply cloud mask
        //.map(maskCloudShadows)  // Apply cloud shadow mask
        .map(maskB11);

    // Create a composite of all cloud-free images over the AOI
    var composite = processedImageCollection.mean();
    
    // Clip the composite to the specified region
    var clippedComposite = composite.clip(region);
    
    if (visualize) {
        var NDVI = clippedComposite.expression(
            "(NIR - RED) / (NIR + RED)",
            {
                RED: clippedComposite.select("B4"),
                NIR: clippedComposite.select("B8")
            }
        );
        //Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");
    
        var FAI = clippedComposite.expression(    
            '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
            {
                B8: clippedComposite.select('B8'),
                B4: clippedComposite.select('B4'),
                B11: clippedComposite.select('B11')
            }
        ).rename('FAI');
        //Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']},  year + " FAI");
    
        var KD = clippedComposite.expression(
            '(r6 - b4)',
            {
                b4: clippedComposite.select('B4'),
                r6: clippedComposite.select('B6')
            }
        ).rename('KD');
        //Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']},  year + " KD");
    }

    return clippedComposite;
}

// Function to process multiple years and classify each year's data, showing pixel counts for each class
function processMultipleYearsAndClassify(years, region, classNames) {
    // Create the multi-year composite for training the classifier
    var multiYearComposite = createMultiYearComposite([2019,2020,2021,2022], AOI);

    var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8','B11'];
    
    // Extract training data from select bands of the multi-year composite
    var training = multiYearComposite.select(bands).sampleRegions({
      collection: classNames,
      properties: ['landcover'],
      scale: 10
    });
    print(training);

    // Train classifier - e.g. cart, randomForest, svm
    var classifier = ee.Classifier.libsvm().train({
      features: training,
      classProperty: 'landcover',
      inputProperties: bands
    });

    // Process each year, apply classifier, and show pixel counts
    years.forEach(function(year) {
        var composite = processSingleYear(year, region, true); // Process each year

        // Run the classification for the year
        var classified = composite.select(bands).classify(classifier);

        // Add the classification to the map view, specify colours for classes
        Map.addLayer(classified,
        {min: 0, max: 2, palette: ['black', 'white']},
        'classification_' + year);

        // Count the number of pixels for each class
        var pixelCounts = classified.reduceRegion({
            reducer: ee.Reducer.frequencyHistogram(),
            geometry: region,
            scale: 10,
            maxPixels: 1e8
        });

        //Print pixel counts for each class
        print('Pixel counts for ' + year + ':', pixelCounts);
    });
}

// Set the area of interest
Map.centerObject(sanmiguel, 15);

// Example: Call the function to process multiple years (2019-2024)
var years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
processMultipleYearsAndClassify(years, geometry3, water.merge(kelp));

// Merge into one FeatureCollection and print details to console
var classNames = water.merge(kelp);
print(classNames);
