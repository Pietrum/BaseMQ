'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var bmq = require('../');

describe('[Request - Reply]', function() {
  var client;
  var worker;

  afterEach(function() {
    client.removeAllListeners();
    client.destroy();
    worker.removeAllListeners();
    worker.destroy();
  });

  describe('req <=> rep', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP, // router
        socket: bmq.SOCKET.BIND       // bind
      });
      worker.initialize();
    });

    it('should be set dealer <=> router connection', function() {
      expect(client._socket.type).to.eq('dealer');
      expect(worker._socket.type).to.eq('router');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });

  describe('req <=> rep_sync', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP_SYNC,  // router
        socket: bmq.SOCKET.BIND             // bind
      });
      worker.initialize();
    });

    it('should be set dealer <=> rep connection', function() {
      expect(client._socket.type).to.eq('dealer');
      expect(worker._socket.type).to.eq('rep');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });

  describe('req_sync <=> rep', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ_SYNC  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP,  // router
        socket: bmq.SOCKET.BIND         // bind
      });
      worker.initialize();
    });

    it('should be set req <=> router connection', function() {
      expect(client._socket.type).to.eq('req');
      expect(worker._socket.type).to.eq('router');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });

  describe('req_sync <=> rep_sync', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ_SYNC // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP_SYNC,  // router
        socket: bmq.SOCKET.BIND             // bind
      });
      worker.initialize();
    });

    it('should be set req <=> rep connection', function() {
      expect(client._socket.type).to.eq('req');
      expect(worker._socket.type).to.eq('rep');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });

  describe('req <=> req', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REQ, // router
        socket: bmq.SOCKET.BIND       // bind
      });
      worker.initialize();
    });

    it('should be set dealer <=> delear connection', function() {
      expect(client._socket.type).to.eq('dealer');
      expect(worker._socket.type).to.eq('dealer');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });

  describe.skip('rep <=> rep', function() {

    beforeEach(function() {
      client = new bmq.Client();
      client.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP  // connect dealer
      });
      client.initialize();

      worker = new bmq.Worker();
      worker.use(bmq.MODULE.CONNECTION, {
        approach: bmq.CONNECTION.REP, // router
        socket: bmq.SOCKET.BIND       // bind
      });
      worker.initialize();
    });

    it('should be set router <=> router connection', function() {
      expect(client._socket.type).to.eq('router');
      expect(worker._socket.type).to.eq('router');
    });

    it('should receive request from client', function(done) {
      client.send('request');

      worker.on('message', function(messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function(done) {
      client.send('request');
      client.on('message', function(messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.on('message', function(messageId) {
        worker.send(messageId, 'reply');
      });
    });

  });
});
