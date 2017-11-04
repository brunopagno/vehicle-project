var vmap = L.map('vmap').setView([52.53, 13.403], 13);

function setupMap() {
    var accessToken = 'pk.eyJ1IjoiYnJ1bm9wYWdubyIsImEiOiJjajlpdGJ1emMzbXF2MzNtcXQzMHo5ZXB1In0.erzTbtFtmoQUulYxuhGw-g';
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + accessToken, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: accessToken
    }).addTo(vmap);
}
setupMap();
