var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

module.exports = {
    
    show: (req, res, next) => {
        let vv = Vehicle.all();
        let ve = lo = {};
        if (vv.length > 0) {
            ve = vv[0];
            lo = Location.get(ve.id);
        }
        res.render('index.html', {
            vehicle: ve,
            locations: lo
        });
    },

};
