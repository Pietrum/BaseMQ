'use strict';

/**
 * Module dependencies.
 */
var zmq = require('zmq');
var Connection = require('../enum/connection');

/**
 * Expose.
 * @param connection
 */
module.exports  = function(connection) {
  var _socket;

  switch (connection.approach) {
    case Connection.REQ:
      _socket = zmq.socket('dealer');
      break;
    case Connection.REQ_SYNC:
      _socket = zmq.socket('req');
      break;
    case Connection.REP:
      _socket = zmq.socket('router');
      break;
    case Connection.REP_SYNC:
      _socket = zmq.socket('rep');
      break;
    case Connection.PUSH:
      _socket = zmq.socket('push');
      break;
    case Connection.PULL:
      _socket = zmq.socket('pull');
      break;
    case Connection.PUB:
      _socket = zmq.socket('pub');
      break;
    case Connection.SUB:
      _socket = zmq.socket('sub');
      _socket.subscribe('');
      break;
  }

  switch (connection.socket) {
    case Connection.CONNECT:
      _socket.connect(connection.endpoint);
      break;
    case Connection.BIND:
      _socket.bindSync(connection.endpoint);
      break;
  }

  return _socket.setsockopt(zmq.ZMQ_LINGER, 0);
};
