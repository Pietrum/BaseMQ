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

describe('[Send]', function () {
  var client;
  var worker;

  afterEach(function () {
    client.socket.disconnect();
    worker.socket.unbind();
  });

  describe('data frame', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.DEALER
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.DEALER
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should recive string data', function (done) {
      client.send('string data');

      worker.recv(function (messageId, data) {
        expect(data).to.be.a('string');
        expect(data).to.eq('string data');
        expect(data.length).to.eq(11);
        done();
      });
    });

    it('should recive number data', function (done) {
      client.send(123);

      worker.recv(function (messageId, data) {
        expect(data).to.be.a('number');
        expect(data).to.eq(123);
        done();
      });
    });

    it('should recive json data..', function (done) {
      client.send({
        foo: 'fooo',
        bar: 123
      });

      worker.recv(function (messageId, data) {
        expect(data).to.be.a('object');
        expect(data).to.have.property('foo').and.eq('fooo');
        expect(data).to.have.property('bar').and.eq(123);
        done();
      });
    });
  });
});
