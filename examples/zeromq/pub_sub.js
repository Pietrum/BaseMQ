'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

var client = new bmq.Client();

client.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.SUBSCRIBER  // connect sub
});

client.initialize();

var worker = new bmq.Worker();

worker.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.PUBLISHER, // pub
  socket: bmq.Connection.BIND   // bind
});

worker.initialize();
