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

describe('[Publisher - Subscriber]', function () {
  var client;
  var worker;

  beforeEach(function (done) {
    client = bmq()
      .use(bmq.MODULE.SOCKET, {
        type: bmq.SOCKET.SUB
      })
      .connect();

    worker = bmq()
      .use(bmq.MODULE.SOCKET, {
        type: bmq.SOCKET.PUB
      })
      .bind();

    // give time for establish connection
    setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
  });

  afterEach(function () {
    client.socket.disconnect();
    worker.socket.unbind();
  });

  describe('pub <=> sub', function () {
    it('should be set push <=> pull connection', function () {
      expect(client.socket.zmq.type).to.eq('sub');
      expect(worker.socket.zmq.type).to.eq('pub');
    });

    it('should receive data from worker', function (done) {
      client.recv(function (data) {
        expect(data).to.eq('pubsubdata');
        done();
      });

      worker.send('pubsubdata');
    });
  });
});
