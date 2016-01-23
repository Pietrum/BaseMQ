'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var bmq = require('../');

describe('[Push - Pull]', function() {
  var client;
  var worker;

  beforeEach(function() {
    client = new bmq.Client();
    client.use(bmq.MODULE.CONNECTION, {
      approach: bmq.CONNECTION.SUB  // connect sub
    });
    client.initialize();

    worker = new bmq.Worker();
    worker.use(bmq.MODULE.CONNECTION, {
      approach: bmq.CONNECTION.PUB, // pub
      socket: bmq.SOCKET.BIND       // bind
    });
    worker.initialize();
  });

  afterEach(function() {
    client.removeAllListeners();
    client.destroy();
    worker.removeAllListeners();
    worker.destroy();
  });

  describe('pub <=> sub', function() {

    it('should be set push <=> pull connection', function() {
      expect(client._socket.type).to.eq('sub');
      expect(worker._socket.type).to.eq('pub');
    });

    it('should receive data from worker', function(done) {
      client.on('message', function(data) {
        expect(data).to.eq('pubsubdata');
        done();
      });

      // waiting for client to establish connection
      setTimeout(function() {
        worker.send('pubsubdata');
      }, 1000);
    });

  });
});
