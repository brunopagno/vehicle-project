const RoutesView = {
    // list of VehicleRoute
    _vehicleRoutes: [],
    _cluster: L.markerClusterGroup(),
    _autoShowRoutesZoomLevel: 16,

    // register in any map event necessary
    initialize: () => {
        vmap.on('zoomend', RoutesView._onMapZoomed);
        vmap.on('moveend', RoutesView._onMapMoved);
        vmap.addLayer(RoutesView._cluster);
    },

    // Method called for "generic update".
    updateData: () => {
        fetch('/map/data').then((response) => {
            response.json().then((result) => {
                result.forEach((entry) => {
                    if (entry.locations.length > 1) {
                        RoutesView._updateRoute(entry);
                    }
                })
            });
        });
    },

    // internal update, will create new "route element" if new id or update existing otherwise
    _updateRoute: (entry) => {
        let vehicleRoute = RoutesView._vehicleRoutes.find((r) => {
            return r.id == entry.vehicle.id;
        });
        if (!vehicleRoute) {
            let vehicle = new VehicleRoute(entry);
            RoutesView._vehicleRoutes.push(vehicle);
            vehicle.registerOn(RoutesView._cluster);
        } else {
            vehicleRoute.updateLine(entry);
            vehicleRoute.updateMaker(entry);
        }
    },

    _onMapZoomed: (e) => {
        if (e.target.getZoom() >= RoutesView._autoShowRoutesZoomLevel) {
            RoutesView._vehicleRoutes.forEach((vehicleRoute) => {
                if(vmap.getBounds().contains(vehicleRoute.marker.getLatLng())) {
                    vehicleRoute.showRoute();
                } else {
                    vehicleRoute.hideRoute();
                }
            });
        } else {
            RoutesView._vehicleRoutes.forEach((vehicleRoute) => {
                vehicleRoute.hideRoute();
            });
        }
    },

    _onMapMoved: (e) => {
        if (e.target.getZoom() >= RoutesView._autoShowRoutesZoomLevel) {
            RoutesView._vehicleRoutes.forEach((vehicleRoute) => {
                if(vmap.getBounds().contains(vehicleRoute.marker.getLatLng())) {
                    vehicleRoute.showRoute();
                } else {
                    vehicleRoute.hideRoute();
                }
            });
        }
    }
}
