'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var bmq = require('../');

describe('[Enum Module]', function () {
  it('should have two-way declaration', function () {
    var value = bmq.MODULE[1];
    expect(bmq.MODULE[value]).to.be.equal(1);
  });

  it('should have a even number of elements', function () {
    var size = Object.keys(bmq.MODULE).length;
    expect(size % 2).to.be.equal(0);
  });
});

describe('[Enum Socket]', function () {
  it('should have two-way declaration', function () {
    var value = bmq.SOCKET[1];
    expect(bmq.SOCKET[value]).to.be.equal(1);
  });

  it('should have a even number of elements', function () {
    var size = Object.keys(bmq.SOCKET).length;
    expect(size % 2).to.be.equal(0);
  });
});
