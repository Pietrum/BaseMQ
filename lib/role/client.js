'use strict';

/**
 * Module dependencies.
 */
var util = require('util');
var BaseMQ = require('../basemq');
var Connection = require('../enum/connection');
var Module = require('../enum/module');

/**
 * Create a new `Client`.
 *
 * @constructor
 * @api public
 */
var Client = module.exports = function Client() {
  BaseMQ.call(this);
};

/**
 * Inherit from `BaseMQ.prototype`.
 */
util.inherits(Client, BaseMQ);

/**
 * Settings default configuration.
 *
 * @api public
 */
Client.prototype.initialize = function() {
  /**
   * Using default `Connection` approach.
   */
  this.use(Module.CONNECTION, {
    approach: Connection.REQ,   // dealer
    socket: Connection.CONNECT, // connect
    address: 'tcp://127.0.0.1:12345'
  });

  // call BaseMQ init method
  return Client.super_.prototype.initialize.apply(this);
};
