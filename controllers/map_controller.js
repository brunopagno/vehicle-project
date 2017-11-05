var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {

    index: (req, res, next) => {
        res.render('index.html');
    },

    all: (req, res, next) => {
        res.json(Vehicle.all().map((v) => {
            return {
                vehicle: v,
                locations: Location.get(v.id)
            }
        }));
    },

    single: (req, res, next) => {
        res.json({
            locations: Location.get(req.params.id)
        });
    },

    fullReset: (req, res, next) => {
        Vehicle.reset();
        Location.reset();
    },

    locationReset: (req, res, next) => {
        Location.reset();
    },

    dump: (req, res, next) => {
        res.json({
            vehicles: Vehicle.all(),
            locations: Location.all()
        });
    }

};
