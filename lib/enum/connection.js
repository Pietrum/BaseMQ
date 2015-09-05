'use strict';

(function(Connection) {
  Connection[Connection.REQ = 0] = 'REQ';
  Connection[Connection.REQ_SYNC = 1] = 'REQ_SYNC';
  Connection[Connection.REP = 2] = 'REP';
  Connection[Connection.REP_SYNC = 3] = 'REP_SYNC';
})(module.exports = {});
