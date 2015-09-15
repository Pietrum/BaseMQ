'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');
var uuid = require('node-uuid');
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

  this._messages = {};
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
BaseMQ.prototype.initialize = function() {
  var _this = this;

  _this._socket = require('./module/connection')(_this._connection);
  _this._socket.on('message', function() {
    var args = Array.prototype.slice.call(arguments);
    var identity;

    // get identity of connection
    if (_this._connection.approach === Connection.REP) {
      identity = args.shift();
    }

    // remove empty delimiter frame
    if ([Connection.REQ, Connection.REP].indexOf(_this._connection.approach) > -1) {
      args.shift();
    }

    args = _.map(args, function(msg) {
      return JSON.parse(msg);
    });

    // get identity of message
    _this._messages[args[0]] = identity;

    if (args[1] === '^') {
      switch (args[2]) {
        case Connection.STATUS_READY:
          // @todo save client/worker identity
          _this.send(args[0], args[1], Connection.STATUS_READY_CONFIRM);
          break;
        case Connection.STATUS_READY_CONFIRM:
          _this.emit('connect');
          break;
      }
    } else {
      _this.emit.apply(_this, args.unshift('message') && args);
    }
  });

  if (this._connection.socket === Connection.CONNECT) {
    this.send('^', Connection.STATUS_READY);
  }

  return Q.resolve(_this._connection);
};

/**
 * Destroy.
 */
BaseMQ.prototype.destroy = function() {
  // leave when no socket connection
  if (!this._socket) {
    return;
  }

  this._socket.close();
};

/**
 * Sending message.
 *
 * @param values... Send values
 */
BaseMQ.prototype.send = function() {
  // leave when no socket connection
  if (!this._socket) {
    return;
  }

  var patt = new RegExp('^[a-z0-9]{8}(\-[a-z0-9]{4}){3}\-[a-z0-9]{12}$');
  var muid;
  var args = Array.prototype.slice.call(arguments);

  if (patt.test(args[0])) {
    muid = args[0];
  } else {
    args.unshift(muid = uuid.v4());
  }

  args = _.map(args, function(msg) {
    return JSON.stringify(msg);
  });

  switch (this._connection.approach) {
    case Connection.REQ:
      args.unshift('');
      break;
    case Connection.REP:
      args.unshift('');
      args.unshift(this._messages[muid]);
      break;
  }

  this._socket.send(args);

  return muid;
};
