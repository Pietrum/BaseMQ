'use strict';

/**
 * Module dependencies.
 */
var debug = require('debug')('BaseMQ:Connection');

/**
 * Used modules.
 */
var Socket = require('./socket');

/**
 * Instance `BaseMQ.Module.Connection`.
 *
 * @param {Config} configs - Instance of Config module.
 * @constructor
 */
function Connection(configs) {
  /**
   * Socket configuration.
   * @type {Config}
   */
  this.configs = configs;
}

/**
 * Establish socket connection.
 *
 * @param {string} link - Socket link.
 * @returns {Socket} Instance of Socket module.
 */
Connection.prototype.establish = function (link) {
  // initialize local socket
  var socket = new Socket(this.configs.uuid);

  // create local socket
  socket.create(this.configs.type);
  socket.monitor();
  socket.endpoint = this.configs.endpoint;
  socket[link]();

  // resolve after connection
  socket.on('listen', resolve.bind(this));
  socket.on('connect', resolve.bind(this));
  socket.on('bind_error', reject.bind(this));
  socket.on('connect_retry', reject.bind(this));

  function resolve(fd, endpoint) {
    debug('[%s] CONNECTION SUCCESSFUL, endpoint: %s', socket.identity, endpoint);

    // connection established, now all depend on heartbeat
    socket.unmonitor();
  }

  function reject(fd, endpoint) {
    debug('[%s] CONNECTION FAILED, endpoint: %s', socket.identity, endpoint);
  }

  return socket;
};

/**
 * Expose.
 * @type {Connection}
 */
module.exports = Connection;
