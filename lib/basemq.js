'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Create a new socket of the given `type`.
 *
 * @constructor
 * @param {String|Number} type
 * @api public
 */
var BaseMQ = module.exports = function BaseMQ() {
  EventEmitter.call(this);
};

/**
 * Inherit from `EventEmitter.prototype`.
 */
util.inherits(BaseMQ, EventEmitter);
