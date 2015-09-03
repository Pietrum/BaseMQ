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
BaseMQ.Heartbeating = require('./lib/enum/heartbeating');
BaseMQ.Pattern = require('./lib/enum/pattern');

/**
 * Types.
 *
 * @api public
 */
BaseMQ.Broker = require('./lib/type/broker');
BaseMQ.Client = require('./lib/type/client');
BaseMQ.Worker = require('./lib/type/worker');
