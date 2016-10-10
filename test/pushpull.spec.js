'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var bmq = require('../');
var CONNECTION_ESTABLISH_TIMEOUT = 300;

describe('[Push - Pull]', function () {
  var client;
  var worker;

  beforeEach(function (done) {
    client = bmq()
      .use(bmq.MODULE.SOCKET, {
        type: bmq.SOCKET.PUSH
      })
      .connect();

    worker = bmq()
      .use(bmq.MODULE.SOCKET, {
        type: bmq.SOCKET.PULL
      })
      .bind();

    // give time for establish connection
    setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
  });

  afterEach(function () {
    client.socket.disconnect();
    worker.socket.unbind();
  });

  describe('push <=> pull', function () {
    it('should be set push <=> pull connection', function () {
      expect(client.socket.zmq.type).to.eq('push');
      expect(worker.socket.zmq.type).to.eq('pull');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (data) {
        expect(data).to.eq('request');
        done();
      });
    });
  });
});
