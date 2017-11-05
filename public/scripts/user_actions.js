const UserActions = {
    resetMap = () => {
        fetch('map/fullreset');
    },

    resetLocations = () => {
        fetch('map/locationsreset');
    }
};
