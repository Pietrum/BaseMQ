'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');
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

  this._connections = [];
  this._sockets = [];
};

/**
 * Inherit from `EventEmitter.prototype`.
 */
util.inherits(BaseMQ, EventEmitter);

/**
 * Module declaration.
 *
 * @param name Module name
 * @param opts... Module params
 */
BaseMQ.prototype.use = function(name) {
  var _this = this;
  var args = Array.apply(null, arguments).slice(1);

  _.forEach(args, function(opt, i) {
    switch (name) {
      case Module.CONNECTION:
        _this._connections[i] = _.defaults({}, _this._connections[i], opt);
        break;
    }
  });
};

/**
 * Initialize.
 */
BaseMQ.prototype.init = function() {
  var _this = this;

  _.forEach(_this._connections, function(connection, i) {
    _this._sockets[i] = require('./module/connection')(_this.constructor.name, connection);
    _this._sockets[i].on('message', function() {
      var args = Array.apply(null, arguments);
      var identity;

      if ([Connection.REP, Connection.REP_SYNC].indexOf(connection.approach) > -1) {
        identity = args.shift();
      }

      if (args[1].toString() === '^') {
        switch (+args[2].toString()) {
          case Connection.STATUS_READY:
            // @todo save client/worker identity
            _this._sockets[i].send([identity, identity, args[1], Connection.STATUS_READY_CONFIRM]);
            break;
          case Connection.STATUS_READY_CONFIRM:
            _this.emit('connect', args[0].toString('utf8'));
            break;
        }
      }
    });
  });
};

