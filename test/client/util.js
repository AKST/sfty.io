

describe("Util", function () {
  describe("Fn", function () {
  
    it('#access', function () {
      var element = { name: 'john' },
          fn = Sfty.Util.Fn.access('name');
      
      assert(fn(element) === 'john', 'name should be hello'); 
    });
  
  });


  describe("String", function () {
  
    it('#generateUrlParams', function () {
      var result = Sfty.Util.Str.generateUrlParams({
        endpoint: '/test',
        params: {
          array: [1, 2, 3],
          value: 4,
        }
      });
      
      assert(result, '/test?array=1,2,3&value=4'); 
    });
  
  });


  describe("Maybe", function () {
    
    it("#something", function () {

//      throw new Sfty.Err.Todo("TODO");

    });
  }); 
});


