Sfty.Err.UpdateError = (function () {
  var ErrorType = function (message) {
    this.message = message;
  };
  
  ErrorType.prototype = Error;

  return ErrorType;
})();