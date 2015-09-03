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

describe('[Heartbeating]', function() {
  it('should have two-way declaration', function() {
    var value = bmq.Heartbeating[0];
    expect(bmq.Heartbeating[value]).to.be.equal(0);
  });

  it('should have a even number of elements', function() {
    var size = Object.keys(bmq.Heartbeating).length;
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
