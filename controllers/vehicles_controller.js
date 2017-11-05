var geo = require('geolib');
var config = require('../config');

var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {

    // Adds new vehicles
    add: (req, res, next) => {
        Vehicle.add({
            "id": req.body.id
        });
        res.status(204).end();
    },

    // Adds new location entries if inside boundaries
    update: (req, res, next) => {
        let distance = geo.getDistanceSimple({
            latitude: req.body.lat,
            longitude: req.body.lng
        }, config.originCoordinate);

        if (distance <= config.maxDistance) {
            Location.add({
                "vehicle_id": req.params.id,
                "lat": req.body.lat,
                "lng": req.body.lng,
                "at": new Date(req.body.at)
            });
        }
        res.status(204).end();
    },

    // Removes vehicles
    delete: (req, res, next) => {
        Vehicle.remove({
            "id": req.params.id
        });
        res.status(204).end();
    }

};
