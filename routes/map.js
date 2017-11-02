var express = require('express');
var router = express.Router();
var mapController = require('../controllers/map_controller');

router.get('/', mapController.show);

module.exports = router;
