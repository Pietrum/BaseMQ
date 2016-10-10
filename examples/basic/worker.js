'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

/**
 * Create Role instance.
 */
var role = bmq(bmq.ROLE.WORKER);

/**
 * Using default Socket approach.
 * No need to define the following block.
 */
role.use(bmq.MODULE.SOCKET, {
  type: bmq.SOCKET.TYPE_ROUTER,
  link: bmq.SOCKET.LINK_BIND,
  endpoint: 'tcp://127.0.0.1:12345'
});

/**
 * Create Worker instance.
 */
var worker = role.init(); // jshint ignore:line
