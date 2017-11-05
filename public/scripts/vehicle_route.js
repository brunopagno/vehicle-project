class VehicleRoute {

    constructor(entry) {
        this.id = entry.vehicle.id;
        this.group = L.layerGroup();
        this.polyline = L.polyline(entry.locations)
        
        this.currentLocation = entry.locations[entry.locations.length - 1];

        this.marker = L.marker(this.currentLocation, {
            icon: _icon,
            rotationAngle: 0
        });
        this.marker.on('mouseover', this._showRoute, this);
        this.marker.on('mouseout', this._hideRoute, this);
        
        this.group.addLayer(this.polyline);
        this.group.addLayer(this.marker);
    }

    registerOn(cluster) {
        this.cluster = cluster;
        cluster.addLayer(this.marker);
    }

    updateLine(entry) {
        this.polyline.setLatLngs(entry.locations);
    }

    updateMaker(entry) {
        if (entry.locations.length > 1) {
            this.currentLocation = entry.locations[entry.locations.length - 1];
            let beforeLocation = entry.locations[entry.locations.length - 2];
            let angle = getAngle(this.currentLocation, beforeLocation);
            this.marker.setLatLng(this.currentLocation);
            this.marker.setRotationAngle(angle);
        }
    }

    showRoute() {
        vmap.addLayer(this.polyline);
    }

    hideRoute() {
        vmap.removeLayer(this.polyline);
    }

    // events
    _showRoute(e) {
        this.showRoute();
    }
    _hideRoute(e) {
        this.hideRoute();
    }
}

// cached icon
const _icon = L.icon({
    iconUrl: '/images/vehicle.png',
    iconSize: [24, 24], // size of the icon
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    // popupAnchor: [-3, -3] // point from which the popup should open relative to the iconAnchor
});
