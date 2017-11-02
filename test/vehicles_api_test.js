var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

var app = require('../index');

describe('vehichles api', () => {

    describe('POST /vehicles', (done) => {
        it ('should return status 204', () => {
            chai.request(app).post('/vehicles').end((err, res) => {
                expect(res.status).to.be.equal(204);
                done();
            });
        });
    });

    describe('POST /vehicles/:id/locations', (done) => {
        it ('should return status 204', () => {
            chai.request(app).post('/vehicles/someId/locations').end((err, res) => {
                expect(res.status).to.be.equal(204);
                done();
            });
        });
    });

    describe('DELETE /vehicles/:id', (done) => {
        it ('should return status 204', () => {
            chai.request(app).post('/vehicles/someId').end((err, res) => {
                expect(res.status).to.be.equal(204);
                done();
            });
        });
    });

});
