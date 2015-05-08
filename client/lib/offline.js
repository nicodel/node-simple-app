/* jshint strict: true, node: true */

var simpleOffline, extendNative, handlers;

simpleOffline = {};

simpleOffline.options = {
  check: {
    url: "/favicon.ico?_=" + (Math.floor(Math.random() * 1000000000)),
    timeout: 5000
  },
  checkOnLoad: true,
  reconnect: true
};

simpleOffline.grab = function(obj, key) {
  'use strict';
  var cur, i, part, parts, _i, _len;
  cur = obj;
  parts = key.split('.');
  for (i = _i = 0, _len = parts.length; _i < _len; i = ++_i) {
    part = parts[i];
    cur = cur[part];
    if (typeof cur !== 'object') {
      break;
    }
  }
  if (i === parts.length - 1) {
    return cur;
  } else {
    return void 0;
  }
};

simpleOffline.getOption = function(key) {
  'use strict';
  var val;
  val = simpleOffline.grab(simpleOffline.options, key);
  if (typeof val === 'function') {
    return val();
  } else {
    return val;
  }
};

if (typeof window.addEventListener === "function") {
  window.addEventListener('online', function() {
    'use strict';
    return setTimeout(simpleOffline.confirmUp, 100);
  }, false);
}

if (typeof window.addEventListener === "function") {
  window.addEventListener('simpleOffline', function() {
    'use strict';
    return simpleOffline.confirmDown();
  }, false);
}

simpleOffline.state = 'up';

simpleOffline.markUp = function() {
  'use strict';
  simpleOffline.trigger('confirmed-up');
  if (simpleOffline.state === 'up') {
    return;
  }
  simpleOffline.state = 'up';
  return simpleOffline.trigger('up');
};

simpleOffline.markDown = function() {
  'use strict';
  simpleOffline.trigger('confirmed-down');
  if (simpleOffline.state === 'down') {
    return;
  }
  simpleOffline.state = 'down';
  return simpleOffline.trigger('down');
};

handlers = {};

simpleOffline.on = function(event, handler, ctx) {
  'use strict';
  var e, events, _i, _len, _results;
  events = event.split(' ');
  if (events.length > 1) {
    _results = [];
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      e = events[_i];
      _results.push(simpleOffline.on(e, handler, ctx));
    }
    return _results;
  } else {
    console.log('handlers[event]', handlers[event]);
    if (handlers[event] === undefined) {
      handlers[event] = [];
    }
    return handlers[event].push([ctx, handler]);
  }
};

simpleOffline.off = function(event, handler) {
  'use strict';
  var ctx, i, _handler, _ref, _results;
  if (handlers[event] === null) {
    return;
  }
  if (!handler) {
    handlers[event] = [];
    return handlers[event];
  } else {
    i = 0;
    _results = [];
    while (i < handlers[event].length) {
      _ref = handlers[event][i], ctx = _ref[0], _handler = _ref[1];
      if (_handler === handler) {
        _results.push(handlers[event].splice(i, 1));
      } else {
        _results.push(i++);
      }
    }
    return _results;
  }
};

simpleOffline.trigger = function(event) {
  'use strict';
  console.log('offline triggers', event);
  var ctx, handler, _i, _len, _ref, _ref1, _results;
  if (handlers[event] !== undefined) {
    _ref = handlers[event];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], ctx = _ref1[0], handler = _ref1[1];
      _results.push(handler.call(ctx));
    }
    return _results;
  }
};

simpleOffline.checkXHR = function(xhr, onUp, onDown) {
  'use strict';
  var checkStatus, _onerror, _onload, _onreadystatechange, _ontimeout;
  checkStatus = function() {
    if (xhr.status && xhr.status < 12000) {
      return onUp();
    } else {
      return onDown();
    }
  };
  if (xhr.onprogress === null) {
    _onerror = xhr.onerror;
    xhr.onerror = function() {
      onDown();
      return typeof _onerror === "function" ? _onerror.apply(null, arguments) : void 0;
    };
    _ontimeout = xhr.ontimeout;
    xhr.ontimeout = function() {
      onDown();
      return typeof _ontimeout === "function" ? _ontimeout.apply(null, arguments) : void 0;
    };
     _onload = xhr.onload;
    return xhr.onload = function() {
      checkStatus();
      return typeof _onload === "function" ? _onload.apply(null, arguments) : void 0;
    };
  } else {
    _onreadystatechange = xhr.onreadystatechange;
    return xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        checkStatus();
      } else if (xhr.readyState === 0) {
        onDown();
      }
      return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
    };
  }
};

simpleOffline.check = function() {
  'use strict';
  simpleOffline.trigger('checking');
  var e, xhr;
  xhr = new XMLHttpRequest();
  xhr.simpleOffline = false;
  xhr.open('HEAD', simpleOffline.getOption('check.url'), true);
  if (xhr.timeout !== null) {
    xhr.timeout = simpleOffline.getOption('check.timeout');
  }
  simpleOffline.checkXHR(xhr, simpleOffline.markUp, simpleOffline.markDown);
  try {
    xhr.send();
  } catch (_error) {
    e = _error;
    simpleOffline.markDown();
  }
  return xhr;
};

simpleOffline.confirmUp = simpleOffline.confirmDown = simpleOffline.check;

simpleOffline.onXHR = function(cb) {
  'use strict';
  var monitorXHR, _XDomainRequest, _XMLHttpRequest;
  monitorXHR = function(req, flags) {
    var _open;
    _open = req.open;
    return req.open = function(type, url, async, user, password) {
      cb({
        type: type,
        url: url,
        async: async,
        flags: flags,
        user: user,
        password: password,
        xhr: req
      });
      return _open.apply(req, arguments);
    };
  };
  _XMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = function(flags) {
    var req, _overrideMimeType, _setRequestHeader;
    req = new _XMLHttpRequest(flags);
    monitorXHR(req, flags);
    _setRequestHeader = req.setRequestHeader;
    req.headers = {};
    req.setRequestHeader = function(name, value) {
      req.headers[name] = value;
      return _setRequestHeader.call(req, name, value);
    };
    _overrideMimeType = req.overrideMimeType;
    req.overrideMimeType = function(type) {
      req.mimeType = type;
      return _overrideMimeType.call(req, type);
    };
    return req;
  };
  extendNative(window.XMLHttpRequest, _XMLHttpRequest);
  if (window.XDomainRequest !== null) {
    _XDomainRequest = window.XDomainRequest;
    window.XDomainRequest = function() {
      var req;
      req = new _XDomainRequest();
      monitorXHR(req);
      return req;
    };
    return extendNative(window.XDomainRequest, _XDomainRequest);
  }
};

simpleOffline.init = function() {
  'use strict';
/*  if (simpleOffline.getOption('checkOnLoad')) {
    return simpleOffline.check();
  }*/
  simpleOffline.check();
/*  window.setTimeout(simpleOffline.init, 2000);
  return true;*/
  if (simpleOffline.getOption('reconnect')) {
    var Reconnect = require('./reconnect');
    Reconnect.init();
  }
};

// setTimeout(init, 0);

window.simpleOffline = simpleOffline;

module.exports = simpleOffline;
