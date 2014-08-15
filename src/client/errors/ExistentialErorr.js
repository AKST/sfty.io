/**
 * Created by Angus on 15/08/2014.
 */

Sfty.Err.ExistentialError = (function () {
  var ErrorType = function (msg) {
    var auxillaryMessage = msg !== undefined ? msg : '';
    this.message = "Is Nothing..." + auxillaryMessage;
  };

  ErrorType.prototype = new Error();

  return ErrorType;
})();