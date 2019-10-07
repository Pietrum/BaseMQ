/**
 * Module dependencies.
 */
const _ = require('lodash');

/**
 * Map of constants.
 */
const MODULE = require('../enum/module');

class Config {
  /**
   * Instance `BaseMQ.Module.Config`.
   *
   * @param {object} configs - user-defined configuration
   * @constructor
   */
  constructor(configs) {
    function iteratee(config, sectionIdx) {
      switch (+sectionIdx) {
        case MODULE.SOCKET:
          if (!config.endpoint) {
            // eslint-disable-next-line no-param-reassign
            config.endpoint = `${config.transport}://${config.host}:${config.port}`;
            // eslint-disable-next-line no-param-reassign
            delete config.transport;
            // eslint-disable-next-line no-param-reassign
            delete config.host;
            // eslint-disable-next-line no-param-reassign
            delete config.port;
          }
          break;
        default:
          break;
      }

      this[MODULE[sectionIdx]] = config;
    }

    _.forEach(configs, iteratee.bind(this));
  }
}

/**
 * Expose.
 * @type {Config}
 */
module.exports = Config;
