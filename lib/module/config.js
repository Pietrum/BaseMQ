'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Map of constants.
 */
var MODULE = require('../enum/module');

/**
 * Instance `BaseMQ.Module.Config`.
 *
 * @param {object} configs - user-defined configuration
 * @constructor
 */
function Config(configs) {

  function iteratee(config, sectionIdx) {
    switch (+sectionIdx) {
      case MODULE.SOCKET:
        if (!config.endpoint) {
          config.endpoint = config.transport + '://' + config.host + ':' + config.port;
          delete config.transport;
          delete config.host;
          delete config.port;
        }
        break;
    }

    /* jshint validthis:true */
    this[MODULE[sectionIdx]] = config;
    /* jshint validthis:false */
  }

  _.forEach(configs, iteratee.bind(this));
}

/**
 * Expose.
 * @type {Config}
 */
module.exports = Config;

