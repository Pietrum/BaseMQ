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
const client = bmq.connect(bmq.SOCKET.REQ);

// listener
client.recv((messageId, result) => {
  // eslint-disable-next-line no-console
  console.log('[%s] recv %d', messageId, result);
});

// task
let x;
let y;

setInterval(() => {
  // random number between 1 and 10
  x = Math.floor(Math.random() * 10 + 1);
  y = Math.floor(Math.random() * 10 + 1);

  // eslint-disable-next-line no-console
  console.log('[%s] sent value %d * %d = ?', client.send(x, y), x, y);
}, 1000);
