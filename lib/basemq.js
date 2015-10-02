'use strict';

/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var util = require('util');
var uuid = require('node-uuid');
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

  this.configs = {};
  this.modules = {};
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
 * @param config Module options
 * @return {BaseMQ} for chaining
 * @api public
 */
BaseMQ.prototype.use = function(name, config) {
  this.configs[name] = _.defaults({}, this.configs[name], config);
  return this;
};

/**
 * Initialize.
 *
 * @return {BaseMQ} for chaining
 * @api public
 */
BaseMQ.prototype.initialize = function() {
  var _this = this;

  _.forEach(Module, function(key) {
    if ('string' === typeof key) {
      _this.modules[Module[key]] = new (require('./module/' + key.toLowerCase()))(_this.configs[Module[key]]);
    }
  });

  this._socket = this.modules[Module.CONNECTION].socket;
  this._socket.on('message', function() {
    var args = Array.prototype.slice.call(arguments);
    var identity;

    // get identity of connection
    if (_this.configs[Module.CONNECTION].approach === Connection.REP) {
      identity = args.shift();
    }

    // remove empty delimiter frame
    switch (_this.configs[Module.CONNECTION].approach) {
      case Connection.REQ:
      case Connection.REP:
        args.shift();
        break;
    }

    args = _.map(args, function(msg) {
      try {
        return JSON.parse(msg);
      } catch (err) {
        // @todo make error handler
        return msg.toString();
      }
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

  if (this.configs[Module.CONNECTION].socket === Connection.CONNECT && this.configs[Module.CONNECTION].approach === Connection.REQ) {
    this.send('^', Connection.STATUS_READY);
  }

  return this;
};

/**
 * Destroy.
 */
BaseMQ.prototype.destroy = function() {
  var _this = this;

  _.forEach(Module, function(key) {
    if ('string' === typeof key && _this.modules[Module[key]] && _this.modules[Module[key]].destroy) {
      _this.modules[Module[key]].destroy();
    }
  });
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

  var args = Array.prototype.slice.call(arguments);
  var patt = new RegExp('^[a-z0-9]{8}(\-[a-z0-9]{4}){3}\-[a-z0-9]{12}$');
  var muid;

  switch (this.configs[Module.CONNECTION].approach) {
    case Connection.REQ:
    case Connection.REQ_SYNC:
    case Connection.REP:
    case Connection.REP_SYNC:
      if (patt.test(args[0])) {
        muid = args[0];
      } else {
        args.unshift(muid = uuid.v4());
      }

      break;
  }

  args = _.map(args, function(msg) {
    return JSON.stringify(msg);
  });

  switch (this.configs[Module.CONNECTION].approach) {
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
