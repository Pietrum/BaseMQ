'use strict';

/**
 * Expose `BaseMQ`.
 */
var BaseMQ = module.exports = {};

/**
 * Map of constants.
 *
 * @api public
 */
BaseMQ.CONNECTION = require('./lib/enum/connection');
BaseMQ.HEARTBEAT = require('./lib/enum/heartbeat');
BaseMQ.LOAD_BALANCER = require('./lib/enum/load_balancer');
BaseMQ.MODULE = require('./lib/enum/module');
BaseMQ.SOCKET = require('./lib/enum/socket');
BaseMQ.STATUS = require('./lib/enum/status');

/**
 * Roles.
 *
 * @api public
 */
BaseMQ.Broker = require('./lib/role/broker');
BaseMQ.Client = require('./lib/role/client');
BaseMQ.Worker = require('./lib/role/worker');
