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
      approach: bmq.CONNECTION.PUSH  // connect push
    });
    client.initialize();

    worker = new bmq.Worker();
    worker.use(bmq.MODULE.CONNECTION, {
      approach: bmq.CONNECTION.PULL,  // pull
      socket: bmq.SOCKET.BIND         // bind
    });
    worker.initialize();
  });

  afterEach(function() {
    client.removeAllListeners();
    client.destroy();
    worker.removeAllListeners();
    worker.destroy();
  });

  describe('push <=> pull', function() {

    it('should be set push <=> pull connection', function() {
      expect(client._socket.type).to.eq('push');
      expect(worker._socket.type).to.eq('pull');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(data) {
        expect(data).to.eq('request');
        done();
      });
    });

  });
});
