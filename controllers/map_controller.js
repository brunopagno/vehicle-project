var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {
    
    show: (req, res, next) => {
        res.render('index.html', {
            vehicles: Vehicle.all(),
            locations: Location.all()
        });
    },

};
