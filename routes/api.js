var express = require('express');
var router = express.Router();
var vehiclesController = require('../controllers/vehicles_controller');

router.get('/', (req, res) => res.redirect('/map'));
router.post('/vehicles', vehiclesController.add);
router.post('/vehicles/:id/locations', vehiclesController.update);
router.delete('/vehicles/:id', vehiclesController.delete);

module.exports = router;
