var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    //layers: [lightMap, earthquakes]
});

var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);   

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

    function getColor(mag) {
        return mag > 5 ? '#b30000' :
               mag > 4 ? '#e34a33' :
               mag > 3 ? '#fc8d59' :
               mag > 2 ? '#fdd49e' : 
               mag > 1 ? '#d9f0a3' :
                         '#addd8e';
            
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
                fillColor: getColor(feature.properties.mag),
                color: "#000",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(myMap);

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




