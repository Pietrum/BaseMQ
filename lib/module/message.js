'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var debug = require('debug')('BaseMQ:Message');
var uuid = require('node-uuid');

/**
 * Instance `BaseMQ.Module.Message`.
 *
 * @param {Socket} socket - Instance of Socket module.
 * @constructor
 */
function Message(socket) {
  /**
   * Instance of {@link Socket} module.
   * @type {Socket}
   */
  this.socket = socket;
}

/**
 * Send data through the socket.
 */
Message.prototype.send = function () {
  var args = Array.prototype.slice.call(arguments);
  var patt = new RegExp('^[a-z0-9]{8}(\-[a-z0-9]{4}){3}\-[a-z0-9]{12}$');
  var dest = null;
  var messageId;

  if (this.socket.zmq.type === 'router') {
    // router type has destination as its first frame
    dest = args.shift();
  } else if (this.socket.zmq.type === 'pub') {
    // publisher type has envelope as its first frame
    dest = args.shift();
  }

  // generate message id for request <-> response
  if (this.socket.zmq.type === 'dealer' || this.socket.zmq.type === 'router' ||
      this.socket.zmq.type === 'req' || this.socket.zmq.type === 'rep') {
    // generate message uuid if not exists
    if (patt.test(args[0])) {
      messageId = args[0];
    } else {
      args.unshift(messageId = uuid.v4());
    }
  }

  // encode message data
  args = _.map(args, function (msg) {
    return JSON.stringify(msg);
  });

  // enter destination if exists
  if (dest !== null) {
    args.unshift(dest);
  }

  this.socket.send(args);

  debug('[%s] SEND', this.socket.identity, args);
  return messageId;
};

/**
 * Receive data from the socket.
 *
 * @param {function} callback - forward data.
 */
Message.prototype.recv = function (callback) {
  this.socket.on('message', function () {
    var args = Array.prototype.slice.call(arguments);

    // decode arguments
    args = _.map(args, function (msg) {
      try {
        return JSON.parse(msg);
      } catch (err) {
        return msg.toString();
      }
    });

    debug('[%s] RECV', this.identity, args);

    // resolve callback
    callback.apply(null, args);
  });
};

/**
 * Expose.
 * @type {Message}
 */
module.exports = Message;
