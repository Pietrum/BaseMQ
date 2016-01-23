'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var bmq = require('../');

describe('[Enum Connection]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.CONNECTION[0];
    expect(bmq.CONNECTION[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.CONNECTION).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum Heartbeat]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.HEARTBEAT[0];
    expect(bmq.HEARTBEAT[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.HEARTBEAT).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum LoadBalancer]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.LOAD_BALANCER[0];
    expect(bmq.LOAD_BALANCER[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.LOAD_BALANCER).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum Module]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.MODULE[0];
    expect(bmq.MODULE[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.MODULE).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum Socket]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.SOCKET[0];
    expect(bmq.SOCKET[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.SOCKET).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum Status]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.STATUS[0];
    expect(bmq.STATUS[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.STATUS).length;
    expect(size % 2).to.be.equal(0);
  });
});
