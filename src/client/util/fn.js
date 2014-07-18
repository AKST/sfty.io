Sfty.Util.Fn = {

  invoke: function (arg, fn) {
    return fn(arg);
  },

  /**
   * access a property from an object, used for iteration
   */
  access: function (prop) {
    return function (element) {
      return element[prop]; 
    };
  }

};
