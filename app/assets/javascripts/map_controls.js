// function get_color(percent) {
//     if (percent <= 25) {
//         return "green";
//     } else if (percent <= 50) {
//         return "yellow";
//     } else if (percent <= 75) {
//         return "orange";
//     } else if (percent <= 100) {
//         return "red";
//     }
// }

function place_marker(map, data) {
  map.setView(new L.LatLng(data["coordinates"]["lat"], data["coordinates"]["lng"]), 18);
  var marker = L.marker([data["coordinates"]["lat"], data["coordinates"]["lng"]]).addTo(map);

  today = new Date();
  var day_index = today.getDay() - 1;
  day_index = day_index < 0 ? 6 : day_index; // Shift left from 0 to 6, matches Monday to 0
  hour_index = today.getHours();

  if (typeof(data["popular_times"]) != "undefined") {
      full_busyness = data["populartimes"][day_index][1][1];
      max_busyness = Math.max(...full_busyness);
      busyness = full_busyness[hour_index];
      display_busyness = Math.round(100 * busyness/max_busyness)

      marker.bindPopup("<b>" + data.name + "</b><br>I am " + display_busyness + "% busy right now.").openPopup();
  } else {
      marker.bindPopup("<b>" + data.name + "</b><br>No data available :(").openPopup();
  }
}

function onLocationError(e) {
  mymap.setView([32.7, 39.9], 16);
}
