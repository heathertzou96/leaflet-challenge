# USGS Earthquake Project

## Background
The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. They have a lot of data at hand that needs to be visualized, including their earthquake data.

### Task
* Derive 'All Earthquakes from the Past 7 Days' dataset in JSON form from the [USGS GeoJson Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to be used for visualization
* Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
  * Data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.
  * Popups provide additional information about the earthquake when a marker is clicked.
  * Place a legend that will provide context for your map data.
