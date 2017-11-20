# Vehicle Project

Hello there!

To run with docker:

```
$ docker build -t vehicleproject .
$ docker run -p 3000:3000 -d vehicleproject
```

To run with npm:

* install node https://nodejs.org/en/

```
$ npm install
$ npm start
```

To test:

```
$ npm test
```

---

## About the project

This project was written in nodejs with the help of a few other libs. Most notably [leaflet.js](http://leafletjs.com/).

![Vehicle Project](/doc/capture.png?raw=true)

The app has a few "actions" the user can do:

* Reset map: literally deletes all vehicle and location entries. Use it to reset the application and start capturing data again.
* Reset locations: deletes all location data. Use it to reset routes for all vehicles.
* View data: dumps all the data in the application in the console and in a div at the bottom of the page. Use it to view all stored information the application is using.

* Zoom in/out: while zooming the markers will be clustered/declustered. Also, when the user zooms in enough the application will automatically display the routes for markers in view.
* Mouse over/out: the user can also hover a marker to show it's route. When the mouse leaves the route should disappear.

The project is structured as follows:

`index.js` is the entry point which setups the server and binds a port to listen.

`config.js` has configuration for server rules of center point and maximum range to capture data.

**models**: Define structure and access to in memory data. The only two types are Vehicle and Location. The first keeps track of registered vehicles and the second keeps information about route.

**routes**: Define the routes the application will answer to. Here separated in `api_routes` and `map_routes` to make clear the distinction between the routes the map visualization and the location tracker (simulation tool) use. The routes point to methods defined in controllers.

**controllers**: Define the logic behind each server call. Mostly they deal with Vehicle/Location data.

**views**: Have a single file that basically presents a map and sets up a few javascript structures to fetch information and update the visualization.

**test**: Define tests for the application.

### A better explanation of technology choices

Considering the application consists of displaying vehicles and their routes the most obvious form of visualizing it is a map. Leafletjs is an open source lib for interactive maps which happens to have a friendly api and a few nice plugins to accelerate development.

I believe there's no need for a frontend framework in this situation as most of the work is on leaflet's map. A frontend framework would feel like overkill (and a bit of overhead) for an application like this. Still it would be an interesting addition depending on how this project got expanded.

For the backend the choice of nodejs was simply because it offers less development overhead than other technologies I was used to. Also nodejs has a huge community, a large amount of plugins and good documentation.

### Testing with 1000 vehicles

I did a small experiment in order to validate that the application was running okay (at least locally) with 10x the original load. For that I "copied" the routes for each of the vehicles 10 times and generated a new file.

```
var fs = require('fs');
var uid = require('uuid/v4');
var vv = fs.readFileSync('vehicles.json');
var pp = JSON.parse(vv);

var lotmore = [];
for(let i = 0; i < 10; i++) {
    pp.forEach((item) => {
        lotmore.push({
            id: uid(),
            steps: item.steps
        });
    });
}

var json = JSON.stringify(lotmore); 
fs.writeFile('morevehicles.json', json);
```

The resulting file can be seen at `doc/vehicles.json` and a screen capture showing the application running can be seen at `doc/result10x.mp4`.

### End notes

*I've drawn the favicon myself* using http://www.favicon.cc/