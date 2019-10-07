/**
 * Module dependencies.
 */
const debug = require('debug')('BaseMQ:Socket');
const uuid = require('uuid');
const zmq = require('zeromq');

/**
 * Enumerated values.
 */
const SOCKET = require('../enum/socket');

class Socket {
  /**
   * Instance `BaseMQ.Module.Socket`.
   *
   * @constructor
   * @param {string} identity - Signature for socket connection. Default uuid.v4.
   */
  constructor(identity) {
    this.endpoint = '';
    this.identity = identity || uuid.v4();
    this.zmq = null;
  }

  /**
   * Create 0MQ socket.
   *
   * @param {SOCKET} socketTypeIdx - Enumerated socket type identifier.
   * @returns {Socket} for chaining.
   */
  create(socketTypeIdx) {
    debug('[%s] %s', this.identity, SOCKET[socketTypeIdx]);

    switch (socketTypeIdx) {
      case SOCKET.DEALER:
        this.zmq = zmq.socket('dealer', {});
        break;
      case SOCKET.ROUTER:
        this.zmq = zmq.socket('router', {});
        break;
      case SOCKET.REQ:
        this.zmq = zmq.socket('req', {});
        break;
      case SOCKET.REP:
        this.zmq = zmq.socket('rep', {});
        break;
      case SOCKET.PUSH:
        this.zmq = zmq.socket('push', {});
        break;
      case SOCKET.PULL:
        this.zmq = zmq.socket('pull', {});
        break;
      case SOCKET.PUB:
        this.zmq = zmq.socket('pub', {});
        break;
      case SOCKET.SUB:
        this.zmq = zmq.socket('sub', {});
        this.zmq.subscribe('');
        break;
      default:
        throw new Error('Type does not exist');
    }

    // signature
    this.zmq.identity = this.identity;

    // inherit additional socket methods
    this.monitor = this.zmq.monitor.bind(this.zmq);
    this.unmonitor = this.zmq.unmonitor.bind(this.zmq);
    this.on = this.zmq.on.bind(this.zmq);
    this.send = this.zmq.send.bind(this.zmq);

    // for chaining
    return this;
  }

  /**
   * Create connection to the socket.
   *
   * @returns {Socket} for chaining.
   */
  connect() {
    debug('[%s] CONNECT, endpoint: %s', this.identity, this.endpoint);

    this.zmq.connect(this.endpoint);

    // for chaining
    return this;
  }

  /**
   * Disconnect and destroy connection.
   *
   * @returns {Socket} for chaining.
   */
  disconnect() {
    debug('[%s] DISCONNECT, endpoint: %s', this.identity, this.endpoint);

    this.zmq.disconnect(this.endpoint);
    this.zmq.close();
    delete this.zmq;

    // for chaining
    return this;
  }

  /**
   * Bind socket.
   *
   * @returns {Socket} for chaining.
   */
  bind() {
    debug('[%s] BIND, endpoint: %s', this.identity, this.endpoint);

    this.zmq.bind(this.endpoint);

    // for chaining
    return this;
  }

  /**
   * Unbind and destroy connection.
   *
   * @returns {Socket} for chaining.
   */
  unbind() {
    debug('[%s] UNBIND, endpoint: %s', this.identity, this.endpoint);

    this.zmq.unbindSync(this.endpoint);
    this.zmq.close();
    delete this.zmq;

    // for chaining
    return this;
  }
}

/**
 * Expose.
 * @type {Socket}
 */
module.exports = Socket;
