'use strict';

(function(Heartbeating) {
  Heartbeating[Heartbeating.OFF = 0] = 'OFF';
  Heartbeating[Heartbeating.ONE_WAY = 1] = 'ONE_WAY';
  Heartbeating[Heartbeating.PING_PONG = 2] = 'PING_PONG';
  Heartbeating[Heartbeating.CUSTOM = 9999] = 'CUSTOM';
})(module.exports = {});
