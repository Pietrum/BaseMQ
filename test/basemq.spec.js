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

  it('should expose a Heartbeating enum', function() {
    expect(bmq.Heartbeating).to.be.a('object');
  });

  it('should expose a Pattern enum', function() {
    expect(bmq.Pattern).to.be.a('object');
  });

  it('should expose a Client type', function() {
    expect(bmq.Client).to.be.a('function');
  });

  it('should expose a Broker type', function() {
    expect(bmq.Broker).to.be.a('function');
  });

  it('should expose a Worker type', function() {
    expect(bmq.Worker).to.be.a('function');
  });
});
