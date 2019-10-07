/**
 * Module dependencies.
 */
const debug = require('debug')('BaseMQ:Connection');

/**
 * Used modules.
 */
const Socket = require('./socket');

class Connection {
  /**
   * Instance `BaseMQ.Module.Connection`.
   *
   * @param {Config} configs - Instance of Config module.
   * @constructor
   */
  constructor(configs) {
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
  establish(link) {
    // initialize local socket
    const socket = new Socket(this.configs.uuid);

    // create local socket
    socket.create(this.configs.type);
    socket.monitor();
    socket.endpoint = this.configs.endpoint;
    socket[link]();

    function resolve(fd, endpoint) {
      debug('[%s] CONNECTION SUCCESSFUL, endpoint: %s', socket.identity, endpoint);

      // connection established, now all depend on heartbeat
      socket.unmonitor();
    }

    function reject(fd, endpoint) {
      debug('[%s] CONNECTION FAILED, endpoint: %s', socket.identity, endpoint);
    }

    // resolve after connection
    socket.on('listen', resolve.bind(this));
    socket.on('connect', resolve.bind(this));
    socket.on('bind_error', reject.bind(this));
    socket.on('connect_retry', reject.bind(this));

    return socket;
  }
}

/**
 * Expose.
 * @type {Connection}
 */
module.exports = Connection;
