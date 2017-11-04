const RoutesView = {
    _routes: [],

    updateData: () => {
        fetch('/map/data').then((response) => {
            response.json().then((result) => {
                result.forEach((entry) => {
                    RoutesView._updateRoute(entry);
                })
            });
        });
    },

    _updateRoute: (entry) => {
        let route = RoutesView._routes.find((r) => {
            return r.id == entry.vehicle.id;
        });
        if (!route) {
            RoutesView._routes.push(RoutesView._createRoute(entry));
        } else {
            route = route.polyline;
            route.setLatLngs(entry.locations);
            if (entry.locations.length > 1) {
                let lastLocation = entry.locations[entry.locations.length - 1];
                let beforeLocation = entry.locations[entry.locations.length - 2];
                route.marker = L.marker(lastLocation, {
                    icon: RoutesView._getIcon(),
                    rotationAngle: RoutesView._getAngle(lastLocation, beforeLocation)
                }).addTo(vmap);
            }
        }
    },

    _createRoute: (entry) => {
        let polyline = L.polyline(entry.locations).addTo(vmap)
        polyline.on('mouseover', RoutesView._onMouseOver);
        polyline.on('mouseout', RoutesView._onMouseOut);

        return {
            id: entry.vehicle.id,
            polyline: polyline
        };
    },

    _onMouseOver: (e) => {
        let layer = e.target;

        layer.setStyle({
            color: 'red'
        });
    },

    _onMouseOut: (e) => {
        let layer = e.target;
        layer.setStyle({
            color: 'blue'
        });
    },

    _icon: undefined,
    _getIcon: () => {
        if (!RoutesView._icon) {
            RoutesView._icon = L.icon({
                iconUrl: '/images/vehicle.png',
                iconSize: [24, 24], // size of the icon
                iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -3] // point from which the popup should open relative to the iconAnchor
            });
        }
        return RoutesView._icon;
    },

    _getAngle: (lastLocation, beforeLocation) => {
        let dx = lastLocation.lat - beforeLocation.lat;
        let dy = lastLocation.lng - beforeLocation.lng;
        return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    }
}
