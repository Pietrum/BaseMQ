'use strict';

/**
 * Enumerated value of MODULE.
 *
 * @readonly
 * @enum {number|string}
 */
(function (MODULE) {
  MODULE[MODULE.CONFIG = 1] = 'CONFIG';
  MODULE[MODULE.CONNECTION = 2] = 'CONNECTION';
  MODULE[MODULE.MESSAGE = 3] = 'MESSAGE';
  MODULE[MODULE.SOCKET = 4] = 'SOCKET';
})(module.exports = {});
