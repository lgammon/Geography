var AOI = 
    /* color: #B00B1E */
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
    cloudscore = ee.ImageCollection("GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED");

// Function to process Sentinel-2 images and compute histograms
function processSentinel2(year, region) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-07-31");

    // Cloud Score+ collection
    var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
    var QA_BAND = 'cs'; // Use 'cs' or 'cs_cdf'
    var CLEAR_THRESHOLD = 0.20; // Cloud masking threshold

    // Function to mask clouds using Cloud Score+
    // this makes a composite image containing cloud free pixels over the date range
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
        var mask = image.select('B11').lte(1000); // Keep pixels where B11 <= 0.028
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

    // Visualization parameters for true color and false color
    var trueColour = {
        bands: ["B4", "B3", "B2"],
        min: 0,
        max: 3000
    };
    var falseColour = {
        bands: ["B8", "B4", "B3"],
        min: 0,
        max: 3000
    };

    // Add true color and false color composites to the map
    Map.addLayer(composite, trueColour, year + " true-color image");
    Map.addLayer(composite, falseColour, year + " false-color composite");

    // NDVI calculation
    var NDVI = composite.expression(
        "(NIR - RED) / (NIR + RED)",
        {
            RED: composite.select("B4"),
            NIR: composite.select("B8")
        }
    );
    Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");

    // FAI calculation
    var FAI = composite.expression(
        '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
        {
            B8: composite.select('B8'),
            B4: composite.select('B4'),
            B11: composite.select('B11')
        }
    ).rename('FAI');
    //Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'purple', 'red']}, year + " FAI");

    // KD calculation
    var KD = composite.expression(
        '(r6 - b4)',
        {
            b4: composite.select('B4'),
            r6: composite.select('B6')
        }
    ).rename('KD');
    //Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']}, year + ' KD');

    // Compute histograms for FAI and KD
    var FAI_histogram = FAI.reduceRegion({
        reducer: ee.Reducer.histogram(50), // 50 bins
        geometry: region,
        scale: 30,
        bestEffort: true
    });
    //print("FAI Histogram for " + year, FAI_histogram);

    var KD_histogram = KD.reduceRegion({
        reducer: ee.Reducer.histogram(50), // 50 bins
        geometry: region,
        scale: 30,
        bestEffort: true
    });
    //print("KD Histogram for " + year, KD_histogram);
}

// Set the area of interest
Map.centerObject(AOI,11);

// Call the function for multiple years - remove the '//' for tha code to run
//processSentinel2(2016, AOI);   
//processSentinel2(2017, AOI);
//processSentinel2(2018, AOI);
//processSentinel2(2019, AOI);
processSentinel2(2020, AOI);
//processSentinel2(2021, AOI);
//processSentinel2(2022, AOI);
//processSentinel2(2023, AOI);
//processSentinel2(2024, AOI);
