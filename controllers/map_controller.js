var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {
    
    index: (req, res, next) => {
        res.render('index.html', {
            vehicle_id: Vehicle.all()[5].id
        });
    },

    single: (req, res, next) => {
        res.json({
            locations: Location.get(req.params.id)
        });
    }

};
