'use strict';

const should = require('should');

const RangeArrayToString = require('../index');

const rats = new RangeArrayToString();

describe('Range', () => {

    it('Success range #1', (done) => {
        rats.range([1,2,3,4,5]).then(value => {
            value.should.be.equal('1-5');
            done()
        })
    });

    it('Success range #2', (done) => {
        rats.range([1,3,4,5,6,7,8]).then(value => {
            value.should.be.equal('1,3-8');
            done()
        })
    });

    it('Success range #3', (done) => {
        rats.range([1,2,3,7,8,9,15,17,19,20,21]).then(value => {
            value.should.be.equal('1-3,7-9,15,17,19-21');
            done()
        })
    });

    it('Success range #4', (done) => {
        rats.range([1,2]).then(value => {
            value.should.be.equal('1,2');
            done()
        })
    });

    it('Success range #5', (done) => {
        rats.range([1,2,3,4,5,6,100,1091,1999,2000,2001,2002]).then(value => {
            value.should.be.equal('1-6,100,1091,1999-2002');
            done()
        })
    });

});

describe('Validation', () => {

    it('Should be Array', (done) => {
        rats.range('String').catch(err => {
            err.message.should.be.equal('Validation error: Argument of the "range" method should be Array');
            done()
        })
    });

    it('Should contains numbers only', (done) => {
        rats.range(['one']).catch(err => {
            err.message.should.be.equal('Validation error: "one" is not a number');
            done()
        })
    });

    it('Should contains Positive', (done) => {
        rats.range([1,2,3,-5]).catch(err => {
            err.message.should.be.equal('Validation error: "-5" Elements of the array should be Integer and Positive');
            done()
        })
    });

    it('Should contains Integer number', (done) => {
        rats.range([1,2,3,3.4]).catch(err => {
            err.message.should.be.equal('Validation error: "3.4" Elements of the array should be Integer and Positive');
            done()
        })
    });

    it('Sort by asc', (done) => {
        rats.range([22,1,2,3]).catch(err => {
            err.message.should.be.equal('Validation error: Elements of the array should be sort by asc');
            done()
        })
    });
});