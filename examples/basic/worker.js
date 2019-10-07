//    bmq = require('basemq');
const bmq = require('../../index');

// instance is already created,
// make additional configuration if needed
bmq.use(bmq.MODULE.SOCKET, {
  // transport: 'tcp',
  // host: '127.0.0.1',
  // port: 12345,
});

// initialize connection
const worker = bmq.bind(bmq.SOCKET.REP);

// listener
worker.recv((messageId, x, y) => {
  // eslint-disable-next-line no-console
  console.log('[%s] recv %d * %d = ?', messageId, x, y);

  // simulate hard work ;)
  setTimeout(() => {
    // multiply and send back
    const result = x * y;
    // eslint-disable-next-line no-console
    console.log('[%s] send %d', messageId, result);
    worker.send(messageId, result);
  }, 500);
});
