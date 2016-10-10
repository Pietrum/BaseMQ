'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var zmq = require('zmq');

describe('[Dependencies] {zmq}', function () {
  describe('socket type', function () {
    var sock;

    afterEach(function () {
      sock.close();
    });

    it('should be set to `req`', function () {
      sock = zmq.socket('req');
      expect(sock.type).to.eq('req');
    });

    it('should be set to `rep`', function () {
      sock = zmq.socket('rep');
      expect(sock.type).to.eq('rep');
    });

    it('should be set to `router`', function () {
      sock = zmq.socket('router');
      expect(sock.type).to.eq('router');
    });

    it('should be set to `dealer`', function () {
      sock = zmq.socket('dealer');
      expect(sock.type).to.eq('dealer');
    });

    it('should be set to `push`', function () {
      sock = zmq.socket('push');
      expect(sock.type).to.eq('push');
    });

    it('should be set to `pull`', function () {
      sock = zmq.socket('pull');
      expect(sock.type).to.eq('pull');
    });

    it('should be set to `pub`', function () {
      sock = zmq.socket('pub');
      expect(sock.type).to.eq('pub');
    });

    it('should be set to `sub`', function () {
      sock = zmq.socket('sub');
      expect(sock.type).to.eq('sub');
    });
  });
});
