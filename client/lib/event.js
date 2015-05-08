/*jshint strict: true, node: true */

var simpleEvent = function(sender) {
  "use strict";
  this._sender = sender;
  this._listeners = [];
};

simpleEvent.prototype = {
  attach: function (listener) {
    "use strict";
    this._listeners.push(listener);
  },
  notify: function (args) {
    "use strict";
    var index;
    for (index = 0; index < this._listeners.length; index += 1) {
      this._listeners[index](this._sender, args);
    }
  }
};
module.exports = simpleEvent;
