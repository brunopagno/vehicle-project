var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

var app = require('../index');
var Vehicle = require('../models/vehicle');
var Location = require('../models/location');

describe('vehichles api', () => {

    describe('POST /vehicles', (done) => {
        it('should add a vehicle', () => {
            chai.request(app)
                .post('/vehicles')
                .send({id: 'vehicleone'})
                .end((err, res) => {
                    let amount = Vehicle.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(Vehicle.all().length).to.be.greaterThan(amount);
                    done();
                });
        });
    });

    describe('POST /vehicles/:id/locations', (done) => {
        it('should add a location', () => {
            chai.request(app)
                .post('/vehicles/vehicleone/locations')
                .send({
                    lat: '52.53',
                    lng: '13.403',
                    at: "2017-09-01T12:00:00Z"
                })
                .end((err, res) => {
                    let amount = Location.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(Location.all().length).to.be.greaterThan(amount);
                    done();
                });
        });

        it('should not add location on invalid vehicle id', () => {
            chai.request(app)
                .post('/vehicles/invalidid/locations')
                .send({
                    lat: '52.53',
                    lng: '13.403',
                    at: "2017-09-01T12:00:00Z"
                })
                .end((err, res) => {
                    let amount = Location.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(Location.all().length).to.be.equal(amount);
                    done();
                });
        });

        it('should not add location on distant location', () => {
            chai.request(app)
                .post('/vehicles/vehicleone/locations')
                .send({
                    lat: '0',
                    lng: '0',
                    at: "2017-09-01T12:00:00Z"
                })
                .end((err, res) => {
                    let amount = Location.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(Location.all().length).to.be.equal(amount);
                    done();
                });
        });
    });

    describe('DELETE /vehicles/:id', (done) => {
        it('should do nothing removing invalid vehicle id', () => {
            chai.request(app)
                .delete('/vehicles/invalidid')
                .end((err, res) => {
                    let amount = Vehicle.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(amount).to.be.equal(Vehicle.all().length);
                    done();
                });
        });

        it('should remove vehicle', () => {
            chai.request(app)
                .delete('/vehicles/vehicleone')
                .end((err, res) => {
                    let amount = Vehicle.all().length;
                    expect(res.status).to.be.equal(204);
                    expect(amount).to.be.greaterThan(Vehicle.all().length);
                    done();
                });
        });
    });

});
