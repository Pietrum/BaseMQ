/**
 * Module dependencies.
 */
const _ = require('lodash');
const debug = require('debug')('BaseMQ:Message');
const uuid = require('uuid');

class Message {
  /**
   * Instance `BaseMQ.Module.Message`.
   *
   * @param {Socket} socket - Instance of Socket module.
   * @constructor
   */
  constructor(socket) {
    /**
     * Instance of {@link Socket} module.
     * @type {Socket}
     */
    this.socket = socket;
  }

  /**
   * Send data through the socket.
   */
  send(...args) {
    const patt = new RegExp('^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$');
    let dest = null;
    let messageId;

    if (this.socket.zmq.type === 'router') {
      // router type has destination as its first frame
      dest = args.shift();
    } else if (this.socket.zmq.type === 'pub') {
      // publisher type has envelope as its first frame
      dest = args.shift();
    }

    // generate message id for request <-> response
    if (this.socket.zmq.type === 'dealer' || this.socket.zmq.type === 'router'
      || this.socket.zmq.type === 'req' || this.socket.zmq.type === 'rep') {
      // generate message uuid if not exists
      if (patt.test(args[0])) {
        [messageId] = args;
      } else {
        args.unshift(messageId = uuid.v4());
      }
    }

    // encode message data
    // eslint-disable-next-line no-param-reassign
    args = _.map(args, (msg) => (JSON.stringify(msg)));

    // enter destination if exists
    if (dest !== null) {
      args.unshift(dest);
    }

    this.socket.send(args);

    debug('[%s] SEND', this.socket.identity, args);
    return messageId;
  }

  /**
   * Receive data from the socket.
   *
   * @param {function} callback - forward data.
   */
  recv(callback) {
    // eslint-disable-next-line func-names
    this.socket.on('message', function (...args) {
      // decode arguments
      // eslint-disable-next-line no-param-reassign
      args = _.map(args, (msg) => {
        try {
          return JSON.parse(msg);
        } catch (err) {
          return msg.toString();
        }
      });

      debug('[%s] RECV', this.identity, args);

      // resolve callback
      callback(...args);
    });
  }
}

/**
 * Expose.
 * @type {Message}
 */
module.exports = Message;
