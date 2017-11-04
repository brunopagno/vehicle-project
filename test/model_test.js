var chai = require('chai');
var expect = chai.expect;

var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

describe('validate location model', () => {
    before(() => {
        Vehicle.add({
            "id": "vid"
        });
    });

    it('adds an entry when calling add', () => {
        let amount = Location.all().length;

        Location.add({
            "vehicle_id": "vid",
            "lat": 52.53,
            "lng": 13.403,
            "at": new Date()
        });
        
        expect(Location.all().length).to.be.greaterThan(amount);
    });

    it('lists all locations when calling all', () => {
        Location.add({
            "vehicle_id": "vid",
            "lat": 52.55,
            "lng": 13.41,
            "at": new Date()
        });

        let list = Location.all();
        let last = list[list.length - 1];

        expect(list).to.be.an('array');
        expect(last.lat).to.be.equal(52.55);
    });

    it('gets all locations from vehicle when calling get', () => {
        Location.add({
            "vehicle_id": "otherid",
            "lat": 52.53,
            "lng": 13.403,
            "at": new Date()
        });

        expect(Location.get('vid').length).to.be.equal(2);
    })

    it('does not accept adding a location with invalid vehicle_id', () => {
        let amount = Location.all().length;
        Location.add({
            "vehicle_id": "no_vehicle_id",
            "lat": 52.53,
            "lng": 13.403,
            "at": new Date()
        });

        expect(Location.all().length).to.be.equal(amount);
    });
});

describe('validate vehicle model', () => {
    it('add should add a vehicle', () => {
        let amount = Vehicle.all().length;

        Vehicle.add({
            "id": "vehicle_id"
        });

        expect(Vehicle.all().length).to.be.greaterThan(amount);
    });

    it('get should retrive a vehicle', () => {
        expect(Vehicle.get('vehicle_id')).to.be.an('object');
    })

    it ('get with invalid id should not retrieve a vehicle', () => {
        expect(Vehicle.get('no_v_id')).to.be.undefined;
    });

    it('remove should remove the vehicle', () => {
        let amount = Vehicle.all().length;

        Vehicle.remove("vehicle_id");
        let vehicle = Vehicle.get('vehicle_id');
        
        expect(amount).to.be.greaterThan(Vehicle.all().length);
        expect(vehicle).to.be.undefined;
    });

    it('all should list all vehicles', () => {
        Vehicle.add({
            "id": "asdf"
        });

        let list = Vehicle.all();
        let last = list[list.length - 1];

        expect(list).to.be.an('array');
        expect(last.id).to.be.equal('asdf');
    });
});
