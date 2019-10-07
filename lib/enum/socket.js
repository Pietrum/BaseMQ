/**
 * Enumerated value of SOCKET.
 *
 * @readonly
 * @enum {number|string}
 */
const SOCKET = {
  REQ: 0,
  0: 'REQ',
  REP: 1,
  1: 'REP',
  DEALER: 2,
  2: 'DEALER',
  ROUTER: 3,
  3: 'ROUTER',
  PUSH: 4,
  4: 'PUSH',
  PULL: 5,
  5: 'PULL',
  PUB: 6,
  6: 'PUB',
  SUB: 7,
  7: 'SUB',
};

/**
 * Expose.
 */
module.exports = SOCKET;
