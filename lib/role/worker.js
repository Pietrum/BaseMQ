'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var BaseMQ = require('../basemq');
var Connection = require('../enum/connection');
var Module = require('../enum/module');

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
  this.use(Module.CONNECTION, {
    approach: Connection.REQ,   // dealer
    socket: Connection.CONNECT, // connect
    address: 'tcp://127.0.0.1:12345'
  });

  // call BaseMQ init method
  return Worker.super_.prototype.initialize.apply(this);
};
