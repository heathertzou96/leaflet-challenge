var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function(data) {
    console.log(data);
    
    createFeatures(data.features);
});
  
function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    function markerSize(mag) {
        return mag * 5;
    }

    // var circleMarker = {
    //     radius: 8,
    //     fillColor: "#ff7800",
    //     color: "#000",
    //     weight: 1,
    //     opacity: 1,
    //     fillOpacity: 0.8
    // };

    var earthquakes = L.geoJSON(earthquakeData, {
        
        onEachFeature: onEachFeature, 

        pointToLayer: function (feature, latlng) {
            //console.log(feature);
            //console.log(latlng);
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag), 
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
       
        }
    
    });

    createMap(earthquakes);
}




function createMap(earthquakes) { 

    var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    });   

    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [lightMap, earthquakes]
    });
  
} 