const RoutesView = {
    // list of VehicleRoute
    _vehicleRoutes: [],

    // register in any map event necessary
    initialize: () => {
        vmap.on('zoomend', (e) => {
            console.log("ZOOME => " + e.target.getZoom());
        });
    },

    // Method called for "generic update".
    updateData: () => {
        fetch('/map/data').then((response) => {
            response.json().then((result) => {
                result.forEach((entry) => {
                    RoutesView._updateRoute(entry);
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
            vehicle.registerOnMap(vmap);
        } else {
            vehicleRoute.updateLine(entry);
            vehicleRoute.updateMaker(entry);
        }
    }
}
