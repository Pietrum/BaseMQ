'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var BaseMQ = require('../basemq');

/**
 * Create a new target of the given `type`.
 *
 * @constructor
 * @api public
 */
var Worker = module.exports = function(group, opts) {
  BaseMQ.call(this, opts);
};

/**
 * Inherit from `BaseMQ.prototype`.
 */
util.inherits(Worker, BaseMQ);
