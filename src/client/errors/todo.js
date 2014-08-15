Sfty.Err.Todo = (function () {
  var ErrorType = function (msg) {
    this.msg = msg;
  };

  ErrorType.prototype = new Error();

  return ErrorType;
}());
