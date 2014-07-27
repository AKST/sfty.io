/**
 * Function decorators
 */
Sfty.Util.Decrs = {

  /**
   * Invokes functions on params before
   * @deprecated
   */
  invokeB: function () {
    var fn      = _.last(arguments),
        invokes = _.init(arguments);

    return function (arg) {
      arg = _.reduce(invokes, Sfty.Fn.invoke, arg, this); 
      return fn.call(this, arg); 
    };
  },

  /**
   * Requires all predicates to pass
   * before calling function.
   */
  predicate: function (preds, fn) {
    return function () {
      var current,
          args = _.toArray(arguments);

      while (preds.length) {
        current = preds.pop(); 
        if (!current.apply(this, args)) {
          throw new TypeError('failed to pass predicates'); 
        }
      }

      return fn.apply(this, args); 
    };
  }

};
