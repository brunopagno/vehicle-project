var express = require('express');
var router = express.Router();
var vehiclesController = require('../controllers/vehicles_controller');

router.post('/vehicles', vehiclesController.add);
router.post('/vehicles/:id/locations', vehiclesController.add);
router.delete('/vehicles/:id', vehiclesController.add);

module.exports = router;