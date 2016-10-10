'use strict';

/**
 * Enumerated value of SOCKET.
 *
 * @readonly
 * @enum {number|string}
 */
(function (SOCKET) {
  SOCKET[SOCKET.REQ = 1] = 'REQ';
  SOCKET[SOCKET.REP = 2] = 'REP';
  SOCKET[SOCKET.DEALER = 3] = 'DEALER';
  SOCKET[SOCKET.ROUTER = 4] = 'ROUTER';
  SOCKET[SOCKET.PUSH = 5] = 'PUSH';
  SOCKET[SOCKET.PULL = 6] = 'PULL';
  SOCKET[SOCKET.PUB = 7] = 'PUB';
  SOCKET[SOCKET.SUB = 8] = 'SUB';
})(module.exports = {});
