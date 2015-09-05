'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var bmq = require('../');

describe('[BaseMQ]', function() {
  it('should expose as object', function() {
    expect(bmq).to.be.a('object');
  });

  it('should expose a Connection enum', function() {
    expect(bmq.Connection).to.be.a('object');
  });

  it('should expose a Heartbeat enum', function() {
    expect(bmq.Heartbeat).to.be.a('object');
  });

  it('should expose a LoadBalancer enum', function() {
    expect(bmq.LoadBalancer).to.be.a('object');
  });

  it('should expose a Module enum', function() {
    expect(bmq.Module).to.be.a('object');
  });

  it('should expose a Client role', function() {
    expect(bmq.Client).to.be.a('function');
  });

  it('should expose a Broker role', function() {
    expect(bmq.Broker).to.be.a('function');
  });

  it('should expose a Worker role', function() {
    expect(bmq.Worker).to.be.a('function');
  });
});
