'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

/**
 * Create `Client` instance.
 */
var client = new bmq.Client();

/**
 * Using default `Connection` approach.
 * No need to define the following block.
 */
client.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REQ,     // dealer
  address: 'tcp://127.0.0.1:12345'  // connect
});

/**
 * Initialize.
 */
client.init();
