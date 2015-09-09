'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

/**
 * Create `Broker` instance.
 */
var broker = new bmq.Broker();

/**
 * Using default `Connection` approach.
 * No need to define the following block.
 */
broker.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REP,     // router
  address: 'tcp://127.0.0.1:12345'  // bind
});

/**
 * Using default `Heartbeat` approach.
 * No need to define the following block.
 */
broker.use(bmq.Module.HEARTBEAT, null, {
  approach: bmq.Heartbeat.OFF
});

/**
 * Initialize.
 */
broker.init();
