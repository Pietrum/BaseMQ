'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var bmq = require('../');

describe('[Connection]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.Connection[0];
    expect(bmq.Connection[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.Connection).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Heartbeat]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.Heartbeat[0];
    expect(bmq.Heartbeat[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.Heartbeat).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[LoadBalancer]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.LoadBalancer[0];
    expect(bmq.LoadBalancer[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.LoadBalancer).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Module]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.Module[0];
    expect(bmq.Module[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.Module).length;
    expect(size % 2).to.be.equal(0);
  });
});
