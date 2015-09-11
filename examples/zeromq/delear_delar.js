'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

var client = new bmq.Client();

client.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REQ  // connect dealer
});

client.initialize();

var worker = new bmq.Worker();

worker.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REQ, // dealer
  socket: bmq.Connection.BIND   // bind
});

worker.initialize();
