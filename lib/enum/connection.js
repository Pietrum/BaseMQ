'use strict';

(function(Connection) {
  Connection[Connection.REQ = 0] = 'REQ';
  Connection[Connection.REQ_SYNC = 1] = 'REQ_SYNC';
  Connection[Connection.REP = 2] = 'REP';
  Connection[Connection.REP_SYNC = 3] = 'REP_SYNC';
  Connection[Connection.PUSH = 4] = 'PUSH';
  Connection[Connection.PULL = 5] = 'PULL';
  Connection[Connection.PUB = 6] = 'PUB';
  Connection[Connection.SUB = 7] = 'SUB';
})(module.exports = {});
