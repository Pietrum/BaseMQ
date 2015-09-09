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
Broker.prototype.init = function() {
  /**
   * Using default `Connection` approach.
   */
  this.use(Module.CONNECTION, {
    approach: Connection.REP,         // router
    address: 'tcp://127.0.0.1:12345'  // connect
  });

  // call BaseMQ init method
  Broker.super_.prototype.init.apply(this);
};
