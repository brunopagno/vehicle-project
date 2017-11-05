var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {

    // Access to visualization
    index: (req, res, next) => {
        res.render('index.html');
    },

    // Callback to retrieve structured data
    // It is better to iterate in the frontend with this structure
    all: (req, res, next) => {
        res.json(Vehicle.all().map((v) => {
            return {
                vehicle: v,
                locations: Location.get(v.id)
            }
        }));
    },

    // Callback to retrievve a single vehicle's route
    single: (req, res, next) => {
        res.json({
            locations: Location.get(req.params.id)
        });
    },

    // Resets all data
    fullReset: (req, res, next) => {
        Vehicle.reset();
        Location.reset();
    },

    // Resets location data
    locationReset: (req, res, next) => {
        Location.reset();
    },

    // Retrieves all data in friendly format
    dump: (req, res, next) => {
        res.json({
            vehicles: Vehicle.all(),
            locations: Location.all()
        });
    }

};
