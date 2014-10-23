

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


  describe("Math", function () {
    describe("::linearPlot", function () {
      describe("0,0 -> 10, 10", function () {
        var y = Sfty.Util.Math.linearPlot([1,1], [10, 10]);

        it("x=3 ~ y=3", function () {
          assert(y(3) >= 2.9, "x=3 therefore y > 2.9"); 
        });

        it("x=3 ~ y=3", function () {
          assert(y(3) <= 3.1, "x=3 therefore y < 3.1"); 
        });
      });

      describe("1,2 -> 10, 20", function () {
        var y = Sfty.Util.Math.linearPlot([1,2], [10, 20]);

        it("x=3 ~ y < 6.1", function () {
          assert(y(3) <= 6.1, "x=3 therefore y < 6.1"); 
        });

        it("x=3 ~ y > 5.9", function () {
          assert(y(3) >= 5.9, "x=3 therefore y > 5.9"); 
        });

        it("x=10 ~ y > 19.9", function () {
          assert(y(10) >= 19.9, "x=10 therefore y < 19.9"); 
        });

        it("x=10 ~ y < 20.1", function () {
          assert(y(10) <= 20.1, "x=3 therefore y=20.1"); 
        });
      });
    });


    describe("::randomrange", function () {
      var withRandom = function (min, max, n, fn) {
        for (var i = 0; i < n; i++ ) {
          fn(Sfty.Util.Math.randRange(min, max));
        }
      };

      describe("random numbers above 1", function () {
        var min = 1, max = 10;


        it("less than or equal to max", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat <= max, randFloat + " is greater than max ("+max+")");
          });
        });

        it("greater than or equal to min", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat >= min, randFloat + " is less than max ("+min+")");
          });
        });
      });

      describe("random numbers above where min is 0", function () {
        var min = 0, max = 10;

        it("less than or equal to max", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat <= max, randFloat + " is greater than max ("+max+")");
          });
        });

        it("greater than or equal to min", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat >= min, randFloat + " is less than max ("+min+")");
          });
        });
      });

      describe("random numbers below 0", function () {
        var min = -1000, max = 0;

        it("less than or equal to max", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat <= max, randFloat + " is greater than max ("+max+")");
          });
        });

        it("greater than or equal to min", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat >= min, randFloat + " is less than max ("+min+")");
          });
        });
      });

      describe("random numbers below and above 0", function () {
        var min = -1000, max = 1000;

        it("less than or equal to max", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat <= max, randFloat + " is greater than max ("+max+")");
          });
        });

        it("greater than or equal to min", function () {
          withRandom(min, max, 100, function (randFloat) {
            assert(randFloat >= min, randFloat + " is less than max ("+min+")");
          });
        });
      });
    });
  });
});


