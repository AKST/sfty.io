Sfty.Util.Debug = (function () {
  
  var logProperty = function (prop) {
    return function (name, fn) {
      if (fn === undefined) {
        fn = name;
        name = "???";
      }
      return function () {
        var propBlob = JSON.stringify(this[prop], null, 2);
        console.log(name + "." + prop + " >>> " + propBlob);
        return fn.call(this, arguments);
      };
    };
  };
  
  return {

    skip: function (name, fn) {
      if (fn === undefined) {
        fn = name;
        name = undefined;
      }
      return function () {
        return fn.call(this, arguments);
      };
    },

    logProperty: logProperty,
    
    logProps: logProperty("props"),
    
    logState: logProperty("state"),

  };
}());
