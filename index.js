var express = require('express');

var port = process.env.PORT || 3000;

var apiRoutes = require('./routes/api');

var app = express();
app.use('/', apiRoutes);

app.listen(port, () => console.log('Vehicles project listening at port ' + port));

module.exports = app; // used for testing
// more can be found at
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
