'use strict';

/**
 * Expose `BaseMQ`.
 *
 * @api public
 */
module.exports = require('./lib/basemq');

/**
 * Map of constants.
 *
 * @api public
 */
module.exports.MODULE = require('./lib/enum/module');
module.exports.SOCKET = require('./lib/enum/socket');
