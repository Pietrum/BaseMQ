'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

/**
 * Create `Worker` instance.
 */
var worker = new bmq.Worker();

/**
 * Using default `Connection` approach.
 * No need to define the following block.
 */
worker.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REQ,   // dealer
  socket: bmq.Connection.CONNECT, // connect
  address: 'tcp://127.0.0.1:12345'
});

/**
 * Initialize.
 */
worker.initialize().then(function(opts) {
  console.log('initialized', opts);
});

