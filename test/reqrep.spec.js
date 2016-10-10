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

describe('[Request - Reply]', function () {
  var client;
  var worker;

  afterEach(function () {
    client.socket.disconnect();
    worker.socket.unbind();
  });

  describe('dealer <=> router', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.DEALER
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.ROUTER
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should be set dealer <=> router connection', function () {
      expect(client.socket.zmq.type).to.eq('dealer');
      expect(worker.socket.zmq.type).to.eq('router');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (identity, messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('request');
      client.recv(function (messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (identity, messageId) {
        worker.send(identity, messageId, 'reply');
      });
    });
  });

  describe.skip('dealer <=> rep', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.DEALER
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.REP
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should be set dealer <=> rep connection', function () {
      expect(client.socket.zmq.type).to.eq('dealer');
      expect(worker.socket.zmq.type).to.eq('rep');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('request');
      client.recv(function (messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (messageId) {
        worker.send(messageId, 'reply');
      });
    });
  });

  describe.skip('req <=> router', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.REQ
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.ROUTER
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should be set req <=> router connection', function () {
      expect(client.socket.zmq.type).to.eq('req');
      expect(worker.socket.zmq.type).to.eq('router');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('request');
      client.recv(function (messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (identity, messageId) {
        worker.send(identity, messageId, 'reply');
      });
    });
  });

  describe('req <=> rep', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.REQ
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          type: bmq.SOCKET.REP
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should be set req <=> rep connection', function () {
      expect(client.socket.zmq.type).to.eq('req');
      expect(worker.socket.zmq.type).to.eq('rep');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('request');
      client.recv(function (messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (messageId) {
        worker.send(messageId, 'reply');
      });
    });
  });

  describe('dealer <=> dealer', function () {
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

    it('should be set dealer <=> delear connection', function () {
      expect(client.socket.zmq.type).to.eq('dealer');
      expect(worker.socket.zmq.type).to.eq('dealer');
    });

    it('should receive request from client', function (done) {
      client.send('request');

      worker.recv(function (messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('request');
      client.recv(function (messageId, data) {
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (messageId) {
        worker.send(messageId, 'reply');
      });
    });
  });

  describe('router <=> router', function () {
    beforeEach(function (done) {
      client = bmq()
        .use(bmq.MODULE.SOCKET, {
          uuid: 'client',
          type: bmq.SOCKET.ROUTER
        })
        .connect();

      worker = bmq()
        .use(bmq.MODULE.SOCKET, {
          uuid: 'server',
          type: bmq.SOCKET.ROUTER
        })
        .bind();

      // give time for establish connection
      setTimeout(done, CONNECTION_ESTABLISH_TIMEOUT);
    });

    it('should be set router <=> router connection', function () {
      expect(client.socket.zmq.type).to.eq('router');
      expect(worker.socket.zmq.type).to.eq('router');
    });

    it('should receive request from client', function (done) {
      client.send('server', 'request');

      worker.recv(function (identity, messageId, data) {
        expect(data).to.eq('request');
        done();
      });
    });

    it('should receive reply from worker', function (done) {
      client.send('server', 'request');
      client.recv(function (identity, messageId, data) {
        expect(identity).to.eq('server');
        expect(data).to.eq('reply');
        done();
      });

      worker.recv(function (identity, messageId) {
        worker.send(identity, messageId, 'reply');
      });
    });
  });
});
