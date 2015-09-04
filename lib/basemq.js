'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');

/**
 * Create a new socket of the given `type`.
 *
 * @constructor
 * @param {String|Number} type
 * @api public
 */
var BaseMQ = module.exports = function BaseMQ(opts) {
  EventEmitter.call(this);

  var _this = this;
  this._connectinos = [];

  _.forEach(opts.connections, function(connection) {
    connection.role = _this.constructor.name;
    _this._connectinos.push(connection);
  });
};

/**
 * Inherit from `EventEmitter.prototype`.
 */
util.inherits(BaseMQ, EventEmitter);
