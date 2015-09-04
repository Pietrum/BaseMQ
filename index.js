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
BaseMQ.Pattern = require('./lib/enum/pattern');

/**
 * Types.
 *
 * @api public
 */
BaseMQ.Broker = require('./lib/type/broker');
BaseMQ.Client = require('./lib/type/client');
BaseMQ.Worker = require('./lib/type/worker');
