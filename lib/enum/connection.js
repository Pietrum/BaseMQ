'use strict';

(function(Connection) {
  // Socket
  Connection[Connection.REQ = 0] = 'REQ';
  Connection[Connection.REQ_SYNC = 1] = 'REQ_SYNC';
  Connection[Connection.REP = 2] = 'REP';
  Connection[Connection.REP_SYNC = 3] = 'REP_SYNC';

  // Status
  Connection[Connection.STATUS_READY = 11] = 'STATUS_READY';
  Connection[Connection.STATUS_READY_CONFIRM = 12] = 'STATUS_READY_CONFIRM';
})(module.exports = {});
