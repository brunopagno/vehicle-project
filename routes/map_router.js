var express = require('express');
var router = express.Router();
var mapController = require('../controllers/map_controller');

router.get('/', mapController.index);
router.get('/data', mapController.all);
router.get('/fullreset', mapController.fullReset);
router.get('/locationsreset', mapController.locationReset);
router.get('/dump', mapController.dump);
router.get('/:id', mapController.single);

module.exports = router;
