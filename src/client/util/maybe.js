
/**
 * Based on the Optional type pattern, look up
 *  - Haskells Maybe data type 
 *  - Scalas & Javas Optional class
 */
Sfty.Util.Maybe = (function () {

  return ClassExtender.extend({

    init: function (value) {
      this.__value = value;
    },

    invoke: function (name) {
      var args = _.tail(_.toArray(arguments));
      if (!this.isNothing()) {
        return new Sfty.Util.Maybe(this.__value[name].call(this.__value, args));
      }
      else {
        return new Sfty.Util.Maybe();
      }
    },

    isNothing: function () {
      return (this.__value === null || this.__value === undefined);
    },

    getValue: function (otherwise) {
      if (otherwise === undefined) {
        throw new Sfty.Err.ExistentialError("hey man, what's your deal?");
      }
      if (!this.isNothing()) {
        return this.__value;
      }
      else {
        return otherwise;
      }
    },

    map: function (f) {
      if (!this.isNothing()) {
        return new Sfty.Util.Maybe(f(this.__value));
      }
      else {
        return new Sfty.Util.Maybe();
      }
    }

  });
}());

