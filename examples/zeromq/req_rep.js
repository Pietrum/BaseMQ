'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

var client = new bmq.Client();

client.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REQ_SYNC,  // req
  socket: bmq.Connection.BIND         // bind
});

client.initialize();

var worker = new bmq.Worker();

worker.use(bmq.Module.CONNECTION, {
  approach: bmq.Connection.REP_SYNC // connect rep
  //socket: bmq.Connection.BIND     // bind
});

worker.initialize();
