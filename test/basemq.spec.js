'use strict';

/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var bmq = require('../');

describe('[BaseMQ]', function () {
  it('should expose as object', function () {
    expect(bmq).to.be.a('function');
  });

  it('should expose a Module enum', function () {
    expect(bmq.MODULE).to.be.a('object');
  });

  it('should expose a Socket enum', function () {
    expect(bmq.SOCKET).to.be.a('object');
  });
});
