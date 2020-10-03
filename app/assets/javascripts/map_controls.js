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

  if (typeof(data["populartimes"]) != "undefined") {
      full_busyness    = data["populartimes"][day_index][1][1];
      live_busyness    = data["current_popularity"];
      max_busyness     = Math.max(...full_busyness);
      busyness         = full_busyness[hour_index];
      display_busyness = Math.round(100 * busyness/max_busyness);

      message = "<b>" + data.name + "</b><br>I am usually " + display_busyness + "% busy right now."

      if (typeof(live_busyness) === "number") {
        message = message + "<br><b>Live Data:</b> " + Math.round(100 * live_busyness/max_busyness) + "% busy."
      }
  } else {
      message = "<b>" + data.name + "</b><br>No data available :("
  }
  marker.bindPopup(message).openPopup();
}

function onLocationError(e) {
  mymap.setView([32.7, 39.9], 16);
}
