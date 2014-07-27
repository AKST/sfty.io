
/**
 * Based on the Optional type pattern, look up
 *  - Haskells Maybe data type 
 *  - Scalas & Javas Optional class
 */
Sfty.Util.Maybe = ClassExtender.extend({

  init: function (value) {
    this.isNothing = 
      value === null ||
      value === undefined;
    this.value = value;
  },

  invoke: function (name) {
    var args = _.tail(_.toArray(arguments));
    if (!this.isNothing) {
      return new Sfty.Util.Maybe(this.value[name].call(this.value, args)); 
    }
    else {
      return new Sfty.Util.Maybe();
    }
  },

  otherwise: function (otherwise) {
    if (!this.isNothing) {
      return this.value;
    }
    else {
      return otherwise;
    }
  },

  map: function (f) {
    if (!this.isNothing) {
      return new Sfty.Util.Maybe(f(this.value)); 
    }
    else {
      return new Sfty.Util.Maybe();
    }
  }

});
