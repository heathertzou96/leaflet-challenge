//create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
});

//add a tile layer (light map)
var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);   

//store our API end point inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//send the data features object to the createFeatures function after we get a response
d3.json(queryUrl, function(data) {
    
    console.log(data);
    
    createFeatures(data.features);
});

//createFeatures function will add circleMarker (size and color depends on magnitude) as well as information (place, time, magnitude) for each earthquake
function createFeatures(earthquakeData) {

    //define a function we want to run once for each feature in the features array
    function onEachFeature(feature, layer) {
        //give each feature a popup with place, time, magnitude info
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "<p>" + `Magnitude: ${feature.properties.mag}` + "</p>");
    }

    //markerSize based on magnitude (will multiply by 5 so it shows on map at its default settings) and will be applied to the circleMarker size
    function markerSize(mag) {
        return mag * 5;
    }

    //color for circleMarker
    //reference: https://leafletjs.com/examples/choropleth/
    function getColor(mag) {
        return mag > 5 ? '#b30000' :
               mag > 4 ? '#e34a33' :
               mag > 3 ? '#fc8d59' :
               mag > 2 ? '#fdd49e' : 
               mag > 1 ? '#d9f0a3' :
                         '#addd8e';
            
    }

    //create a geoJSON layer containing the features array on the earthquakeData object
    var earthquakes = L.geoJSON(earthquakeData, {
        
        //runs the onEachFeature function for each feature
        onEachFeature: onEachFeature, 

        //use pointToLayer option to create a circle marker
        //reference: https://leafletjs.com/examples/geojson/ and https://stackoverflow.com/questions/44206050/leaflet-change-circle-marker-color-based-on-text-field
        pointToLayer: function (feature, latlng) {
            //console.log(feature);
            //console.log(latlng);
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag), 
                fillColor: getColor(feature.properties.mag),
                color: "#000",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(myMap);

    //set up legend
    //reference: https://leafletjs.com/examples/choropleth/ 
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5],
            labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
   
}




