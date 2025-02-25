// Function to process Sentinel-2 images and compute histograms
function processSentinel2(year, region) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-06-01");
    var endDate = ee.Date(year + "-08-31");

    // Load Sentinel-2 image collection for the given year
    var imageCollection = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
        .filterDate(startDate, endDate) // Filter by date
        .filterBounds(region) // Filter by region
        .sort("CLOUDY_PIXEL_PERCENTAGE") // Sort by lowest cloud cover
        .map(function(image) {
            return image.updateMask(image.select('QA60').eq(0)); // Mask out cloudy pixels
        })
        .first(); // Get the best image (least cloud cover)

    // Print the selected image to the console
    print("Image for " + year, imageCollection);

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
    Map.addLayer(imageCollection, trueColour, year + " true-color image");
    Map.addLayer(imageCollection, falseColour, year + " false-color composite");

    // NDVI calculation
    var NDVI = imageCollection.expression(
        "(NIR - RED) / (NIR + RED)",
        {
            RED: imageCollection.select("B4"),
            NIR: imageCollection.select("B8")
        }
    );
    Map.addLayer(NDVI, {min: -0.5, max: 1, palette: ['white', 'yellow','green','red']}, year + " NDVI");

    // FAI calculation
    var FAI = imageCollection.expression(
        '(B8 - (B4 + (B11 - B4) * ((0.833 - 0.665) / (1.612 - 0.665))))',
        {
            B8: imageCollection.select('B8'),
            B4: imageCollection.select('B4'),
            B11: imageCollection.select('B11')
        }
    ).rename('FAI');
    Map.addLayer(FAI, {min: -1536, max: 4000, palette: ['white', 'blue', 'orange', 'yellow']}, year + " FAI");

    // KD calculation
    var KD = imageCollection.expression(
        '(r6 - b4)',
        {
            b4: imageCollection.select('B4'),
            r6: imageCollection.select('B6')
        }
    ).rename('KD');
    Map.addLayer(KD, {min: -2304, max: 5000, palette: ['white', 'orange', 'blue', 'red']}, year + ' KD');
}

// Set the area of interest
Map.centerObject(miguel);

// Call the function for multiple years
processSentinel2(2017, miguel);
// processSentinel2(2018, miguel);
// processSentinel2(2019, miguel);
// processSentinel2(2020, miguel);
// processSentinel2(2021, miguel);
// processSentinel2(2022, miguel);
// processSentinel2(2023, miguel);
// processSentinel2(2024, miguel);
