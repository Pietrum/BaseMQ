'use strict';

(function(Socket) {
  Socket[Socket.PUB = 0] = 'PUB';
  Socket[Socket.XPUB = 1] = 'XPUB';
  Socket[Socket.SUB = 2] = 'SUB';
  Socket[Socket.XSUB = 3] = 'XSUB';
  Socket[Socket.REQ = 4] = 'REQ';
  Socket[Socket.XREQ = 5] = 'XREQ';
  Socket[Socket.REP = 6] = 'REP';
  Socket[Socket.XREP = 7] = 'XREP';
  Socket[Socket.PUSH = 8] = 'PUSH';
  Socket[Socket.PULL = 9] = 'PULL';
  Socket[Socket.DEALER = 10] = 'DEALER';
  Socket[Socket.ROUTER = 11] = 'ROUTER';
  Socket[Socket.PAIR = 12] = 'PAIR';
  Socket[Socket.STREAM = 13] = 'STREAM';
})(module.exports = {});
