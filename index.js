var express = require('express');
var path = require('path');

var port = process.env.PORT || 3000;

var apiRoutes = require('./routes/api_router');
var mapRoutes = require('./routes/map_router');

var app = express();

app.use(express.json());
app.use((err, req, res, next) => {
    if (err && req.method == "DELETE") {
        next();
    } else {
        console.log(err);
    }
});

// views
app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/leaflet', express.static(__dirname + '/node_modules/leaflet/dist/'));
app.use('/leafletrotated', express.static(__dirname + '/node_modules/leaflet-rotatedmarker/'));
app.use('/leafletcluster', express.static(__dirname + '/node_modules/leaflet.markercluster/dist'));

// routes
app.use('/', apiRoutes);
app.use('/map', mapRoutes);

app.listen(port, () => console.log('Vehicles project listening at port ' + port));

// used for testing
// more can be found at
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
module.exports = app;
