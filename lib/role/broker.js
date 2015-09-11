'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var BaseMQ = require('../basemq');
var Connection = require('../enum/connection');
var Module = require('../enum/module');

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
  this.use(Module.CONNECTION, {
    approach: Connection.REP, // router
    socket: Connection.BIND,  // bind
    address: 'tcp://127.0.0.1:12345'
  });

  // call BaseMQ init method
  return Broker.super_.prototype.initialize.apply(this);
};
