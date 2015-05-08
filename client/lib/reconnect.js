/* jshint strict: true, node: true */

var Offline = require('./offline');

// var down, next, nope, rc, reset, retryIntv, tick, tryNow, up;

var rc = Offline.reconnect = {};

rc.retryIntv = null;

rc.reset = function() {
  'use strict';
  var _ref;
  if ((rc.state !== null) && rc.state !== 'inactive') {
    Offline.trigger('reconnect:stopped');
  }
  rc.state = 'inactive';
  rc.remaining = rc.delay = (_ref = Offline.getOption('reconnect.initialDelay')) !== null ? _ref : 3;
  return rc.remaining;
};

rc.next = function() {
  'use strict';
  var delay, _ref;
  delay = (_ref = Offline.getOption('reconnect.delay')) !== null ? _ref : Math.min(Math.ceil(rc.delay * 1.5), 3600);
  rc.remaining = rc.delay = delay;
  return rc.remaining;
};

rc.tick = function() {
  'use strict';
  if (rc.state === 'connecting') {
    return;
  }
  rc.remaining -= 1;
  Offline.trigger('reconnect:tick');
  if (rc.remaining === 0) {
    return rc.tryNow();
  }
};

rc.tryNow = function() {
  'use strict';
  if (rc.state !== 'waiting') {
    return;
  }
  Offline.trigger('reconnect:connecting');
  rc.state = 'connecting';
  return Offline.check();
};

rc.down = function() {
  'use strict';
  if (!Offline.getOption('reconnect')) {
    return;
  }
  rc.reset();
  rc.state = 'waiting';
  Offline.trigger('reconnect:started');
  rc.retryIntv = setInterval(rc.tick, 1000);
  return rc.retryIntv;
};

rc.up = function() {
  'use strict';
  if (rc.retryIntv !== null) {
    clearInterval(rc.retryIntv);
  }
  return rc.reset();
};

rc.nope = function() {
  'use strict';
  if (!Offline.getOption('reconnect')) {
    return;
  }
  if (rc.state === 'connecting') {
    Offline.trigger('reconnect:failure');
    rc.state = 'waiting';
    return rc.next();
  }
};

rc.init = function() {
  'use strict';
  rc.tryNow = rc.tryNow;
  rc.reset();

  Offline.on('down', rc.down);

  Offline.on('confirmed-down', rc.nope);

  Offline.on('up', rc.up);
};
module.exports = rc;
