module.exports = {

    add: (req, res, next) => {
        console.log("add request");
        res.status(204).end();
    },

    update: (req, res, next) => {
        console.log("update request");
        res.status(204).end();
    },

    delete: (req, res, next) => {
        console.log("delete request");
        res.status(204).end();
    }

};
