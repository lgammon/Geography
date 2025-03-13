// Generates SST for California code - can be edited to do a smaller area
// also generates a histogram of all temperature values :D

var region = 
    /* color: #badd1e */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-126.21131002982877, 40.102956016512145],
          [-126.21131002982877, 32.01702590426389],
          [-116.49939596732877, 32.01702590426389],
          [-116.49939596732877, 40.102956016512145]]], null, false);
// Set the area of interest
Map.centerObject(region, 11);

// User parameters:
var showSingleYear = false; // Set to true to display a single year instead of the composite
var selectedYear = 2023; // Year to display if showSingleYear is true

// Function to process and visualize Sea Surface Temperature (SST) for a single year
function processSST(year, region) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-08-31");

    // Load JAXA GCOM-C SST dataset
    var sst = ee.ImageCollection('JAXA/GCOM-C/L3/OCEAN/SST/V3')
        .filterDate(startDate, endDate) // Filter by date
        .filter(ee.Filter.eq('SATELLITE_DIRECTION', 'D')) // Filter for daytime data
        .select('SST_AVE') // Select only the SST_AVE band
        .mean() // Compute mean composite
        .multiply(0.0012).add(-10) // Adjust for scale
        .clip(region); // Clip to the specified region

    return sst;
}

// Function to create a multi-year median composite
function createMultiYearComposite(years, region) {
    var composites = years.map(function(year) {
        return processSST(year, region);
    });

    var multiYearComposite = ee.ImageCollection(composites).median();
    
    return multiYearComposite;
}

// List of years to process
var years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Generate the multi-year composite
var multiYearSST = createMultiYearComposite(years, region);
/*
// Load the DEM dataset and create a mask
var dem = ee.Image('USGS/SRTMGL1_003').select('elevation');
var demMask = dem.lt(0); // Masking land (keep ocean areas only)

// Apply the DEM mask to the SST composite
var maskedSST = multiYearSST.updateMask(demMask);
*/
// Visualization parameters
var vis = {
    bands: ['SST_AVE'],
    min: 0,
    max: 25,
    palette: ['000000', '005aff', '43c8c8', 'fff700', 'ff0000'],
};

// Display either the multi-year composite or a single year
if (showSingleYear) {
    var singleYearSST = processSST(selectedYear, region).updateMask(demMask);
    Map.addLayer(singleYearSST, vis, 'SST ' + selectedYear);
    print('SST for ' + selectedYear, singleYearSST);
} else {
    Map.addLayer(multiYearSST, vis, 'Multi-Year SST Composite');
    print('Multi-Year SST Composite', multiYearSST);
}

// Function to add a legend
function addLegend() {
    var legend = ui.Panel({
        style: {
            position: 'bottom-right',
            padding: '8px 15px',
            backgroundColor: 'white'
        }
    });

    var title = ui.Label({
        value: 'Sea Surface Temperature (°C)',
        style: { fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0' }
    });

    // Create a color bar image
    var gradient = ee.Image(ee.Array([[0, 5, 10, 15, 20, 25, 30]])).toByte();
    var colorBar = gradient.visualize({
        min: 0,
        max: 30,
        palette: ['000000', '005aff', '43c8c8', 'fff700', 'ff0000']
    });

    var thumbnail = ui.Thumbnail({
        image: colorBar,
        params: {
            dimensions: '100x10',
            format: 'png'
        },
        style: { stretch: 'horizontal', margin: '0px 8px' }
    });

    var labels = ui.Panel({
        widgets: [
            ui.Label('0', { margin: '0 0 4px 0' }),
            ui.Label('15', { margin: '0 0 4px 40px' }),
            ui.Label('30', { margin: '0 0 4px 75px' })
        ],
        layout: ui.Panel.Layout.flow('horizontal')
    });

    legend.add(title);
    legend.add(thumbnail);
    legend.add(labels);

    Map.add(legend);
}

// Add the legend to the map
addLegend();

