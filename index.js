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
BaseMQ.Connection = require('./lib/enum/connection');
BaseMQ.Heartbeat = require('./lib/enum/heartbeat');
BaseMQ.LoadBalancer = require('./lib/enum/loadbalancer');
BaseMQ.Module = require('./lib/enum/module');

/**
 * Roles.
 *
 * @api public
 */
BaseMQ.Broker = require('./lib/role/broker');
BaseMQ.Client = require('./lib/role/client');
BaseMQ.Worker = require('./lib/role/worker');
