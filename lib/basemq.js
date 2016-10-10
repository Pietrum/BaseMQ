'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Used modules.
 */
var Config = require('./module/config');
var Connection = require('./module/connection');
var Message = require('./module/message');

/**
 * Map of constants.
 */
var MODULE = require('./enum/module');

/**
 * Instance `BaseMQ`.
 *
 * @constructor
 */
var BaseMQ = function BaseMQ() {
  if (!(this instanceof BaseMQ)) {
    return new BaseMQ();
  }

  /**
   * User-defined configuration.
   * @type {Object}
   */
  this.configs = {};
};

/**
 * Declare configuration for specific module.
 *
 * @param {MODULE} moduleIdx - Module identifier.
 * @param {object} configs - Module options.
 * @returns {BaseMQ} for chaining.
 *
 * @api public
 */
BaseMQ.prototype.use = function (moduleIdx, configs) {
  this.configs[moduleIdx] = this.configs[moduleIdx] || {};
  this.configs[moduleIdx] = _.defaults(this.configs[moduleIdx], configs);

  // for chaining
  return this;
};

/**
 * Prepare socket configuration.
 *
 * @param {string} link - Link connection with socket.
 * @returns {Message} Instance of Message module.
 */
BaseMQ.prototype.init = function (link) {
  var defaultConfigs = {};

  // socket module
  defaultConfigs[MODULE.SOCKET] = {
    transport: 'tcp',
    host: '127.0.0.1',
    port: 12345
  };

  // integrate and validate configuration
  this.configs = new Config(_.defaultsDeep(this.configs, defaultConfigs));

  // initialize connection
  this.connection = new Connection(this.configs.SOCKET);
  this.socket = this.connection.establish(link);

  return new Message(this.socket);
};

/**
 * Bind the socket.
 *
 * @returns {Message} Instance of Message module.
 */
BaseMQ.prototype.connect = function () {
  return this.init('connect');
};

/**
 * Connect to the socket.
 *
 * @returns {Message} Instance of Message module.
 */
BaseMQ.prototype.bind = function () {
  return this.init('bind');
};

/**
 * Expose.
 * @type {BaseMQ}
 */
module.exports = BaseMQ;
