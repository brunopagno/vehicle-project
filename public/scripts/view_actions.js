var lastLocation = [52.53, 13.403];

// gather the data
function updatethething(vehicle_id) {
    fetch('/map/' + vehicle_id).then((response) => {
        response.json().then((result) => {
            locations = result.locations;
            L.polyline(locations).addTo(vmap);
            lastLocation = locations[locations.length - 1];
        });
    });
}

function gotolocation() {
    vmap.panTo(new L.LatLng(lastLocation.lat, lastLocation.lng));
}
