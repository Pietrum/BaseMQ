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
 * Create a new `Worker`.
 *
 * @constructor
 * @api public
 */
var Worker = module.exports = function Worker(opts) {
  BaseMQ.call(this, opts);
};

/**
 * Inherit from `BaseMQ.prototype`.
 */
util.inherits(Worker, BaseMQ);

/**
 * Settings default configuration.
 *
 * @api public
 */
Worker.prototype.initialize = function() {
  /**
   * Using default `Connection` approach.
   */
  this.use(MODULE.CONNECTION, {
    approach: CONNECTION.REQ,   // dealer
    socket: SOCKET.CONNECT, // connect
    endpoint: 'tcp://127.0.0.1:12345'
  });

  // call BaseMQ initialize method
  return Worker.super_.prototype.initialize.apply(this);
};
