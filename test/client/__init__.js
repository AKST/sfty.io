(function () {
  "use strict";
  mocha.setup('bdd');
  chai.should();
  window.expect = chai.expect;
  window.assert = chai.assert;
}());