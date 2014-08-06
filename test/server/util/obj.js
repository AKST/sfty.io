var util = require('../../../src/server/util/obj');


describe('Object Util', function () {

  describe('Write Path', function () {
    it('build path', function () {
      var obj = {};
      var end = {};

      util.writeP(obj, 'a.b.c', end);

      obj['a']['b'] = end;
    });
  });

});
