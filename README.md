[![npm package](https://img.shields.io/npm/v/basemq.svg?style=flat-square)](https://www.npmjs.org/package/basemq)
[![tag:?](https://img.shields.io/github/tag/pietrum/basemq.svg?style=flat-square)](https://github.com/Pietrum/BaseMQ)

[![Dependency Status](https://david-dm.org/Pietrum/basemq.svg?style=flat-square)](https://david-dm.org/Pietrum/basemq)
[![devDependency Status](https://david-dm.org/Pietrum/basemq/dev-status.svg?style=flat-square)](https://david-dm.org/Pietrum/basemq#info=devDependencies)

[![code climate](https://img.shields.io/codeclimate/github/Pietrum/basemq.svg?style=flat-square)](https://codeclimate.com/github/Pietrum/BaseMQ)
[![coverage:?](https://img.shields.io/coveralls/Pietrum/basemq/master.svg?style=flat-square)](https://coveralls.io/r/Pietrum/BaseMQ)

[![Travis CI](https://img.shields.io/travis/Pietrum/BaseMQ.svg?style=flat-square)](https://travis-ci.org/Pietrum/BaseMQ)

Node.js Microservices Architecture framework based on ZeroMQ

# Quick Start

## Install

```shell
$ npm install basemq
```

# Basic Usage

## Client

```javascript
'use strict';

var bmq = require('basemq');

// Create `Client` instance.
var client = new bmq.Client();

// Initialize.
client.initialize();
```

## Broker

Using a request-reply broker makes your client/server architectures easier to scale because clients don't see workers, and workers don't see clients. The only static node is the broker in the middle.

```javascript
'use strict';

var bmq = require('basemq');

// Create `Broker` instance.
var broker = new bmq.Broker();

// Initialize.
broker.initialize();
```

## Worker

```javascript
'use strict';

var bmq = require('basemq');

// Create `Worker` instance.
var worker = new bmq.Worker();

// Initialize.
worker.initialize();
```

See [examples](examples) for more complex cases.

# Connection Module

In theory with ZeroMQ sockets, it does not matter which end connects and which end binds.
As a general rule of thumb, the node that does BIND is a "server", sitting on a well-known network address, and the node which does CONNECT is a "client", with unknown or arbitrary network addresses.

approach            | description
:------------------ | :----------
Connection.CONNECT  | Create outgoing connection from socket.
Connection.BIND     | Accept incoming connections on a socket.

endpoint | description
:------- | :----------
[string] | It is a string consisting of a *transport* *://* followed by an *address*.

## Request / Reply

socket              | description
:------------------ | :----------
Connection.REQ      | This gives us an asynchronous client that can talk to multiple REP servers at the same time.
Connection.REQ_SYNC | This gives us a client that can talk to REP server.
Connection.REP      | This gives us an asynchronous server that can talk to multiple REQ clients at the same time.
Connection.REP_SYNC | This gives us a server that can talk to REQ client.<br />A REP_SYNC server cannot talk to a REQ client that hasn't first sent it a request.

## Publisher / Subscriber

socket         | description
:------------- | :----------
Connection.PUB | Messages sent are distributed in a fan out fashion to all connected peers.
Connection.SUB | It is used by a *subscriber* to subscribe to data distributed by a publisher.


## Push / Pull

socket          | description
:-------------- | :----------
Connection.PUSH | It is used by a pipeline node to send messages to downstream pipeline nodes. Messages are round-robined to all connected downstream nodes.
Connection.PULL | It is used by a pipeline node to receive messages from upstream pipeline nodes. Messages are fair-queued from among all connected upstream nodes.

# [WIP] Heartbeat Module

*available at the next release*

# [WIP] LoadBalancer Module

*available at the next release*
