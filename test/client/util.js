

describe("Util", function () {
  "use strict";

  describe("Fn", function () {
  
    it('::access', function () {
      var element = { name: 'john' },
          fn = Sfty.Util.Fn.access('name');
      
      assert(fn(element) === 'john', 'name should be hello'); 
    });
  
  });


  describe("String", function () {
  
    it('::generateUrlParams', function () {
      var result = Sfty.Util.Str.generateUrlParams({
        endpoint: '/test',
        params: {
          array: [1, 2, 3],
          __value: 4,
        }
      });
      
      assert(result, '/test?array=1,2,3&value=4'); 
    });
  
  });


  describe("Maybe", function () {
    
    it("::something", function () {

      var some = new Sfty.Util.Maybe(4);
      assert(!some.isNothing(), "is a body!!!");

      var none = new Sfty.Util.Maybe(null);
      assert(none.isNothing(), "is a nobody!!!");

    });

    it("::map", function () {

      var some = new Sfty.Util.Maybe(4);
      some = some.map(function (x) { return x + 1; });
      assert(some.getValue(0) === 5, "successful map");

    });

    it("::getValue", function () {

      var some = new Sfty.Util.Maybe();
      assert(some.getValue(3) === 3, "is nothing, no body");

    });

  }); 
});


