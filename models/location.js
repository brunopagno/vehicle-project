var data = [];

// data should be something like this
// l = {
//     "vehicle_id": "uuid",
//     "lat": 0,
//     "lng": 0,
//     "at": new Date()
// }

module.exports = {
    add: (obj) => {
        data.push(obj);
    },

    get: (id) => {
        return data.filter((obj) => obj.vehicle_id == id);
    },

    all: () => {
        return data;
    }
};
