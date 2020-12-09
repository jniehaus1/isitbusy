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
function fucking_text(percentage) {
    if (percentage >= 100) {
        return "There's people fucking everywhere!"
    } else if (percentage >= 90) {
        return "It's fucking packed"
    } else if (percentage >= 75) {
        return "It's pretty fucking busy"
    } else if (percentage >= 50) {
        return "Somewhat fucking busy"
    } else if (percentage >= 25) {
        return "There's a few fuckers around"
    } else if (percentage >= 0) {
        return "It's fucking empty"
    }
}

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

      message = "<h3>" + fucking_text(display_busyness) + "</h3><b>" + data.name + "</b><br>"

      if (typeof(live_busyness) === "number") {
        message = message + "<b>Live Data:</b> " + Math.round(100 * live_busyness/max_busyness) + "% busy."
      }
  } else {
      message = "<b>" + data.name + "</b><br>No data available :("
  }
  marker.bindPopup(message).openPopup();
}

function onLocationError(e) {
  mymap.setView([32.7, 39.9], 16);
}
