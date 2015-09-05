'use strict';

(function(Heartbeat) {
  Heartbeat[Heartbeat.OFF = 0] = 'OFF';
  Heartbeat[Heartbeat.ONE_WAY = 1] = 'ONE_WAY';
  Heartbeat[Heartbeat.PING_PONG = 2] = 'PING_PONG';
  Heartbeat[Heartbeat.PARANOID = 3] = 'PARANOID';
})(module.exports = {});
