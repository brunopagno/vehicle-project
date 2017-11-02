var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

var port = process.env.PORT || 3000;

var apiRoutes = require('./routes/api');
var mapRoutes = require('./routes/map');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// views
app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', apiRoutes);
app.use('/map', mapRoutes);

app.listen(port, () => console.log('Vehicles project listening at port ' + port));

// used for testing
// more can be found at
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
module.exports = app;
