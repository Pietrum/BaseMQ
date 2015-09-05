'use strict';

(function(Module) {
  Module[Module.CONNECTION = 0] = 'CONNECTION';
  Module[Module.HEARTBEAT = 1] = 'HEARTBEAT';
  Module[Module.LOAD_BALANCER = 2] = 'LOAD_BALANCER';
})(module.exports = {});
