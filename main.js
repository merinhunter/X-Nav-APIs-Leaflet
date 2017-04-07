$(document).ready(function() {
  var map = L.map('map').setView([40.2838, -3.8215], 15);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([40.2838, -3.8215]).addTo(map)
    .bindPopup('URJC - Aulario III')
    .openPopup();

  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("Coordenadas: " + e.latlng.toString())
      .openOn(map);
  }

  function onLocationFound(e) {
    var radius = e.accuracy / 3;

    L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + Math.floor(radius) + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  map.locate({setView: true, maxZoom: 16});

  map.on('locationerror', onLocationError);

  map.on('locationfound', onLocationFound);

  map.on('click', onMapClick);
});
