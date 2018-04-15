// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

import tracker_init from "./tracker";


var map,infoWindow;
function initMap(){
  map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: 42.3386095, lng: -71.0944618},
            zoom: 20
          });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

        console.log(pos.lat);
        console.log(pos.lng);
        infoWindow.setPosition(pos);
        infoWindow.setContent('You are here.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      },{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    }else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());

      }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function init() {
  let root = document.getElementById('tracker');

  if(root){
  // Now that you are connected, you can join channels with a topic:
    let channel = socket.channel("tracker:lobby", {});
    tracker_init(root,channel);
    if(document.getElementById('map-canvas')){
      initMap();
    }
  }
}

// Use jQuery to delay until page loaded.
$(init);
