const UserActions = {
    resetMap: () => {
        fetch('map/fullreset');
    },

    resetLocations: () => {
        fetch('map/locationsreset');
    },

    dumpData: () => {
        fetch('map/dump').then((response) => {
            response.json().then((result) => {
                console.log(result);
                let dump = document.getElementById("dump");
                dump.textContent = JSON.stringify(result);
            });
        });
    }
};
