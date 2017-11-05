class VehicleRoute {

    constructor(entry) {
        this.id = entry.vehicle.id;
        this.group = L.layerGroup();
        this.polyline = L.polyline(entry.locations)
        this.polyline.on('mouseover', VehicleRoute._onMouseOver);
        this.polyline.on('mouseout', VehicleRoute._onMouseOut);
        this.group.addLayer(this.polyline);
        this.marker = undefined;
    }

    registerOnMap(map) {
        map.addLayer(this.group);
    }

    updateLine(entry) {
        this.polyline.setLatLngs(entry.locations);
    }

    updateMaker(entry) {
        if (entry.locations.length > 1) {
            let lastLocation = entry.locations[entry.locations.length - 1];
            let beforeLocation = entry.locations[entry.locations.length - 2];
            let angle = getAngle(lastLocation, beforeLocation);
            if (!this.marker) {
                this.marker = L.marker(lastLocation, {
                    icon: _icon,
                    rotationAngle: angle
                });
                this.group.addLayer(this.marker);
            } else {
                this.marker.setLatLng(lastLocation);
                this.marker.setRotationAngle(angle);
            }
        }
    }

    static _onMouseOver(e) {
        let layer = e.target;
        layer.setStyle({
            color: 'red'
        });
    }

    static _onMouseOut(e) {
        let layer = e.target;
        layer.setStyle({
            color: 'blue'
        });
    }

}

// cached icon
const _icon = L.icon({
    iconUrl: '/images/vehicle.png',
    iconSize: [24, 24], // size of the icon
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    // popupAnchor: [-3, -3] // point from which the popup should open relative to the iconAnchor
});
