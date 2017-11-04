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
        let polyline = RoutesView._routes.find((route) => {
            return route.id == entry.vehicle.id;
        });
        if (!polyline) {
            polyline = L.polyline(entry.locations).addTo(vmap)
            polyline.on('mouseover', RoutesView._onHover);
            RoutesView._routes.push({
                id: entry.vehicle.id,
                polyline: polyline
            });
        } else {
            polyline = polyline.polyline;
            polyline.setLatLngs(entry.locations);
        }
    },
    
    _onHover: (e) => {
        let layer = e.target;

        layer.setStyle({
            color: 'red'
        });
    }
}
