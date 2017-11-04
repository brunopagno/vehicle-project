var express = require('express');
var router = express.Router();
var mapController = require('../controllers/map_controller');

router.get('/', mapController.index);
router.get('/:id', mapController.single);

module.exports = router;
