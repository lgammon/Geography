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

// Function to process and visualize Sea Surface Temperature (SST)
function processSST(year, region) {
    // Define the date range for each year
    var startDate = ee.Date(year + "-07-01");
    var endDate = ee.Date(year + "-07-31");

    // Load JAXA GCOM-C SST dataset
    var sst = ee.ImageCollection('JAXA/GCOM-C/L3/OCEAN/SST/V3')
        .filterDate(startDate, endDate) // Filter by date
        .filter(ee.Filter.eq('SATELLITE_DIRECTION', 'D')) // Filter for daytime data
        .mean() // Compute mean composite
        .multiply(0.0012).add(-10) // Adjust for scale
        .select('SST_AVE') // Select only the SST_AVE band
        .clip(region); // Clip to the specified region

    // Visualization parameters
    var vis = {
        bands: ['SST_AVE'],
        min: 0,
        max: 25,
        palette: ['000000', '005aff', '43c8c8', 'fff700', 'ff0000'],
    };

    // Add the SST layer to the map
    Map.addLayer(sst, vis, 'SST ' + year);
    print(year, sst);

    // Compute histogram for SST values
    var histogram = sst.reduceRegion({
        reducer: ee.Reducer.histogram(50), // 50 bins
        geometry: region,
        scale: 500,
        bestEffort: true
    });
    print("Histogram for " + year, histogram);

    // Generate and display the histogram chart
    var chart = ui.Chart.image.histogram({
        image: sst,
        region: region,
        scale: 500,
        minBucketWidth: 0.5
    })
    .setOptions({
        title: 'SST Histogram for ' + year,
        hAxis: { title: 'Temperature (°C)' },
        vAxis: { title: 'Pixel Count' },
        colors: ['blue']
    });
    print(chart);
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

// Process and visualize SST for multiple years
var years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
years.forEach(function(year) {
    processSST(year, region);
});

// Add the legend to the map
addLegend();
