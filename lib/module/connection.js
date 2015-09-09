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
module.exports  = function(role, connection) {
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
  }

  switch (role) {
    case 'Client':
    case 'Worker':
      _socket.connect(connection.address);
      _socket.send(['', '^', Connection.STATUS_READY]);
      break;
    case 'Broker':
      _socket.bindSync(connection.address);
      break;
  }

  return _socket;
};
