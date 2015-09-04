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

describe('[Pattern]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.Pattern[0];
    expect(bmq.Pattern[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.Pattern).length;
    expect(size % 2).to.be.equal(0);
  });
});
