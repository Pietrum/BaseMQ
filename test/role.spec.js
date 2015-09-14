'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai');

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = require('chai').expect;
var bmq = require('../');

describe('[Role Client]', function() {
  var client;

  beforeEach(function() {
    client = new bmq.Client();
  });

  afterEach(function() {
    client.removeAllListeners();
    client.destroy();
  });

  it('should create `Client` object', function() {
    expect(client.constructor.name).to.eq('Client');
  });

  describe('methods', function() {
    it('should have initialize method', function() {
      expect(client.initialize).to.be.a('function');
    });

    it('should have destroy method', function() {
      expect(client.destroy).to.be.a('function');
    });

    it('should have use method', function() {
      expect(client.use).to.be.a('function');
    });

    it('should have on method', function() {
      expect(client.on).to.be.a('function');
    });

    it('should have send method', function() {
      expect(client.send).to.be.a('function');
    });
  });

  describe('initialize', function() {
    it('should be fulfilled', function() {
      return expect(client.initialize()).to.be.fulfilled;
    });

    it('should have defined default configuration', function() {
      return expect(client.initialize()).to.become({
        approach: bmq.Connection.REQ,
        socket: bmq.Connection.CONNECT,
        address: 'tcp://127.0.0.1:12345'
      });
    });
  });
});

describe('[Role Broker]', function() {
  var broker;

  beforeEach(function() {
    broker = new bmq.Broker();
  });

  afterEach(function() {
    broker.removeAllListeners();
    broker.destroy();
  });

  it('should create `Broker` object', function() {
    expect(broker.constructor.name).to.eq('Broker');
  });

  describe('methods', function() {
    it('should have initialize method', function() {
      expect(broker.initialize).to.be.a('function');
    });

    it('should have destroy method', function() {
      expect(broker.destroy).to.be.a('function');
    });

    it('should have use method', function() {
      expect(broker.use).to.be.a('function');
    });

    it('should have on method', function() {
      expect(broker.on).to.be.a('function');
    });

    it('should have send method', function() {
      expect(broker.send).to.be.a('function');
    });
  });

  describe('initialize ', function() {
    it('should be fulfilled', function() {
      return expect(broker.initialize()).to.be.fulfilled;
    });

    it('should have defined default configuration', function() {
      return expect(broker.initialize()).to.become({
        approach: bmq.Connection.REP,
        socket: bmq.Connection.BIND,
        address: 'tcp://127.0.0.1:12345'
      });
    });
  });
});

describe('[Role Worker]', function() {
  var worker;

  beforeEach(function() {
    worker = new bmq.Worker();
  });

  afterEach(function() {
    worker.removeAllListeners();
    worker.destroy();
  });

  it('should create `Worker` object', function() {
    expect(worker.constructor.name).to.eq('Worker');
  });

  describe('methods', function() {
    it('should have initialize method', function() {
      expect(worker.initialize).to.be.a('function');
    });

    it('should have destroy method', function() {
      expect(worker.destroy).to.be.a('function');
    });

    it('should have use method', function() {
      expect(worker.use).to.be.a('function');
    });

    it('should have on method', function() {
      expect(worker.on).to.be.a('function');
    });

    it('should have send method', function() {
      expect(worker.send).to.be.a('function');
    });
  });

  describe('initialize', function() {
    it('should be fulfilled', function() {
      return expect(worker.initialize()).to.be.fulfilled;
    });

    it('should have defined default configuration', function() {
      return expect(worker.initialize()).to.become({
        approach: bmq.Connection.REQ,
        socket: bmq.Connection.CONNECT,
        address: 'tcp://127.0.0.1:12345'
      });
    });
  });
});
