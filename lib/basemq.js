'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');

/**
 * Used modules.
 */
const Config = require('./module/config');
const Connection = require('./module/connection');
const Message = require('./module/message');

/**
 * Map of constants.
 */
const MODULE = require('./enum/module');

/**
 * Instance `BaseMQ`.
 *
 * @constructor
 */
class BaseMQ {
  constructor() {
    /**
     * User-defined configuration.
     * @type {Object}
     */
    this.configs = {};
  }

  /**
   * Declare configuration for specific module.
   *
   * @param {MODULE} moduleIdx - Module identifier.
   * @param {object} configs - Module options.
   * @returns {BaseMQ} for chaining.
   *
   * @api public
   */
  use(moduleIdx, configs) {
    this.configs[moduleIdx] = this.configs[moduleIdx] || {};
    this.configs[moduleIdx] = _.defaults(this.configs[moduleIdx], configs);

    // for chaining
    return this;
  }

  /**
   * Prepare socket configuration.
   *
   * @param {string} link - Link connection with socket.
   * @returns {Message} Instance of Message module.
   */
  init(link) {
    const defaultConfigs = {};

    // socket module
    defaultConfigs[MODULE.SOCKET] = {
      transport: 'tcp',
      host: '127.0.0.1',
      port: 12345,
    };

    // integrate and validate configuration
    this.configs = new Config(_.defaultsDeep(this.configs, defaultConfigs));

    // initialize connection
    this.connection = new Connection(this.configs.SOCKET);
    this.socket = this.connection.establish(link);

    return new Message(this.socket);
  }

  /**
   * Bind the socket.
   *
   * @returns {Message} Instance of Message module.
   */
  connect() {
    return this.init('connect');
  }

  /**
   * Connect to the socket.
   *
   * @returns {Message} Instance of Message module.
   */
  bind() {
    return this.init('bind');
  }
}

/**
 * Expose.
 * @type {BaseMQ}
 */
module.exports = BaseMQ;
