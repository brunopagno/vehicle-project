var express = require('express');
var router = express.Router();
var vehiclesController = require('../controllers/vehicles_controller');

router.post('/vehicles', vehiclesController.add);
router.post('/vehicles/:id/locations', vehiclesController.update);
router.delete('/vehicles/:id', vehiclesController.delete);

module.exports = router;