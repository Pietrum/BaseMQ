'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var BaseMQ = require('../basemq');

/**
 * Map of constants.
 */
var CONNECTION = require('../enum/connection');
var MODULE = require('../enum/module');
var SOCKET = require('../enum/socket');

/**
 * Create a new `Broker`.
 *
 * @constructor
 * @api public
 */
var Broker = module.exports = function Broker(opts) {
  BaseMQ.call(this, opts);
};

/**
 * Inherit from `BaseMQ.prototype`.
 */
util.inherits(Broker, BaseMQ);

/**
 * Settings default configuration.
 *
 * @api public
 */
Broker.prototype.initialize = function() {
  /**
   * Using default `Connection` approach.
   */
  this.use(MODULE.CONNECTION, {
    approach: CONNECTION.REP, // router
    socket: SOCKET.BIND,  // bind
    endpoint: 'tcp://127.0.0.1:12345'
  });

  // call BaseMQ initialize method
  return Broker.super_.prototype.initialize.apply(this);
};
