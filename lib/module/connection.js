'use strict';

/**
 * Module dependencies.
 */
var zmq = require('zmq');
var C = require('../enum/connection');

/**
 * Expose.
 * @param config
 */
var Connection = module.exports = function Connection(config) {
  this.config = config;
  this.socket = null;

  this.initialize();
};

/**
 * ...
 *
 * @return {Connection} for chaining
 */
Connection.prototype.initialize = function() {
  switch (this.config.approach) {
    case C.REQ:
      this.socket = zmq.socket('dealer');
      break;
    case C.REQ_SYNC:
      this.socket = zmq.socket('req');
      break;
    case C.REP:
      this.socket = zmq.socket('router');
      break;
    case C.REP_SYNC:
      this.socket = zmq.socket('rep');
      break;
    case C.PUSH:
      this.socket = zmq.socket('push');
      break;
    case C.PULL:
      this.socket = zmq.socket('pull');
      break;
    case C.PUB:
      this.socket = zmq.socket('pub');
      break;
    case C.SUB:
      this.socket = zmq.socket('sub');
      this.socket.subscribe('');
      break;
  }

  return this.init();
};

/**
 * ...
 *
 * @return {Connection} for chaining
 */
Connection.prototype.init = function() {
  switch (this.config.socket) {
    case C.CONNECT:
      this.socket.connect(this.config.endpoint);
      break;
    case C.BIND:
      this.socket.bindSync(this.config.endpoint);
      this.socket.setsockopt(zmq.ZMQ_LINGER, 0);
      break;
  }

  return this;
};

/**
 * ...
 *
 * @return {Connection} for chaining
 */
Connection.prototype.destroy = function() {
  if (!this.socket) {
    return;
  }

  switch (this.config.socket) {
    case C.CONNECT:
      this.socket.disconnect(this.config.endpoint);
      break;
    case C.BIND:
      this.socket.unbindSync(this.config.endpoint);
      break;
  }

  this.socket.close();
  delete this.socket;

  return this;
};
