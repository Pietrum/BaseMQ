'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');
var Q = require('q');
var Connection = require('./enum/connection');
var Module = require('./enum/module');

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

/**
 * Module declaration.
 *
 * @param name Module name
 * @param opts Module options
 */
BaseMQ.prototype.use = function(name, opts) {
  var _this = this;

  switch (name) {
    case Module.CONNECTION:
      _this._connection = _.defaults({}, _this._connection, opts);
      break;
  }

  return _this;
};

/**
 * Initialize.
 */
BaseMQ.prototype.init = function() {
  var _this = this;

  _this._socket = require('./module/connection')(_this._connection);
  _this._socket.on('message', function() {
    var args = Array.apply(null, arguments);
    var identity;

    if ([Connection.REP, Connection.REP_SYNC].indexOf(_this._connection.approach) > -1) {
      identity = args.shift();
    }

    if (args[1].toString() === '^') {
      switch (+args[2].toString()) {
        case Connection.STATUS_READY:
          // @todo save client/worker identity
          _this._socket.send([identity, identity, args[1], Connection.STATUS_READY_CONFIRM]);
          break;
        case Connection.STATUS_READY_CONFIRM:
          _this.emit('connect', args[0].toString('utf8'));
          break;
      }
    }
  });

  return Q.resolve(_this._connection);
};

