// utility functions

// gets angle from line formed by between two coordinates
function getAngle(lastLocation, beforeLocation) {
    let dx = lastLocation.lat - beforeLocation.lat;
    let dy = lastLocation.lng - beforeLocation.lng;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}
