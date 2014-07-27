

describe("Util", function () {
  describe("Fn", function () {
  
    it('#access', function () {
      var element = { name: 'john' },
          fn = Sfty.Util.Fn.access('name');
      
      assert(fn(element) === 'john', 'name should be hello'); 
    });
  
  });
});


