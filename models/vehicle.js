var data = [];

// data should be something like this
// v = {
//     "id": "uuid"
// }

module.exports = {
    add: (obj) => {
        data.push(obj);
    },

    get: (id) => {
        return data.find((obj) => obj.id == id);
    },

    remove: (id) => {
        let index = -1;
        data.forEach((item, i) => {
            if (item.id == id) {
                index = i;
                return;
            }
        });
        if (index >= 0) {
            data.splice(index, 1);
        }
    },

    all: () => {
        return data;
    },

    reset: () => {
        data = [];
    }
};
