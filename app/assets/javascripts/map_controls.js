function place_marker(map, data) {
  map.panTo(new L.LatLng(data["coordinates"]["lat"], data["coordinates"]["lng"]));
  var marker = L.marker([data["coordinates"]["lat"], data["coordinates"]["lng"]]).addTo(map);

  today = new Date();
  var day_index = today.getDay() - 1;
  day_index = day_index < 0 ? 6 : day_index; // Shift left from 0 to 6, matches Monday to 0
  hour_index = today.getHours();

  full_busyness = data["populartimes"][day_index][1][1];
  max_busyness = Math.max(...full_busyness);
  busyness = full_busyness[hour_index];

  marker.bindPopup("<b>" + data.name + "</b><br>I am " + Math.round(100 * busyness/max_busyness) + "% busy right now.").openPopup();
}

function onLocationError(e) {
  mymap.setView([32.7, 39.9], 16);
}
