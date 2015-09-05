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
  // `Client`s
  approach: bmq.Connection.REP,     // dealer/router
  address: 'tcp://127.0.0.1:12345'  // bind
}, {
  // `Worker`s
  approach: bmq.Connection.REQ,     // dealer/router
  address: 'tcp://127.0.0.1:12346'  // bind
});

/**
 * Using default `LoadBalancer` approach.
 * No need to define the following block.
 */
broker.use(bmq.Module.LOAD_BALANCER, {
  // `Client`s
  approach: bmq.LoadBalancer.INDICATE // force router socket
}, {
  // `Worker`s
  approach: bmq.LoadBalancer.ALIGN    // force dealer socket
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
