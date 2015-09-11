'use strict';

(function(Connection) {
  // Pattern
  Connection[Connection.REQ = 0] = 'REQ';
  Connection[Connection.REQ_SYNC = 1] = 'REQ_SYNC';
  Connection[Connection.REP = 2] = 'REP';
  Connection[Connection.REP_SYNC = 3] = 'REP_SYNC';

  // Socket
  Connection[Connection.CONNECT = 11] = 'CONNECT';
  Connection[Connection.BIND = 12] = 'BIND';

  // Status
  Connection[Connection.STATUS_READY = 21] = 'STATUS_READY';
  Connection[Connection.STATUS_READY_CONFIRM = 22] = 'STATUS_READY_CONFIRM';
})(module.exports = {});
