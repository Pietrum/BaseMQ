'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var bmq = require('../');

describe('[Send]', function() {
  var client;
  var worker;

  afterEach(function() {
    client.removeAllListeners();
    client.destroy();
    worker.removeAllListeners();
    worker.destroy();
  });

  describe('data frame', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.Module.CONNECTION, {
        approach: bmq.Connection.REQ  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.Module.CONNECTION, {
        approach: bmq.Connection.REP, // router
        socket: bmq.Connection.BIND   // bind
      });
      worker.initialize();
    });

    it('should recive string data', function(done) {
      client.send('string data');

      worker.on('message', function(messageId, data) {
        expect(data).to.be.a('string');
        expect(data).to.eq('string data');
        expect(data.length).to.eq(11);
        done();
      });
    });

    it('should recive number data', function(done) {
      client.send(123);

      worker.on('message', function(messageId, data) {
        expect(data).to.be.a('number');
        expect(data).to.eq(123);
        done();
      });
    });

    it('should recive json data..', function(done) {
      client.send({
        foo: 'fooo',
        bar: 123
      });

      worker.on('message', function(messageId, data) {
        expect(data).to.be.a('object');
        expect(data).to.have.property('foo').and.eq('fooo');
        expect(data).to.have.property('bar').and.eq(123);
        done();
      });
    });
  });
});
