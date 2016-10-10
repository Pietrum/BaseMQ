'use strict';

//  bmq = require('basemq');
var bmq = require('../../');

/**
 * Create Role instance.
 */
var role = bmq(bmq.ROLE.CLIENT);

/**
 * Using default Socket approach.
 * No need to define the following block.
 */
role.use(bmq.MODULE.SOCKET, {
  type: bmq.SOCKET.TYPE_DEALER,
  link: bmq.SOCKET.LINK_CONNECT,
  endpoint: 'tcp://127.0.0.1:12345'
});

/**
 * Create Client instance.
 */
var client = role.init(); // jshint ignore:line
