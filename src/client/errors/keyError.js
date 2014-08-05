Sfty.Err.KeyError = (function () {
  var ErrorType = function (key) {
    this.message = "Invalid key: " + key;
  };
  
  ErrorType.prototype = Sfty.Err.UpdateError;

  return ErrorType;
})();