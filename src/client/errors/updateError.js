Sfty.Err.UpdateError = (function () {
  var ErrorType = function (message) {
    this.message = message;
  };
  
  ErrorType.prototype = new Error();
  ErrorType.prototype.constructor = ErrorType;

  return ErrorType;
})();

Sfty.Err.KeyError = (function () {
  var ErrorType = function (key) {
    this.message = "Invalid key: " + key;
  };

  ErrorType.prototype = new Sfty.Err.UpdateError();
  ErrorType.prototype.constructor = ErrorType;

  return ErrorType;
})();