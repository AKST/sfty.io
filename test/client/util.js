

describe("Util", function () {
  describe("Config", function () {
  
    it ('should have a name', function () {
      Sfty.Util.Config.should.have.property('name');    
    });
  
    describe("graph field", function () {
      it('should have graphs field', function () {
        Sfty.Util.Config.should.have.property('graphs');    
      });
  
      var graphs = Sfty.Util.Config.field('graphs');
  
      it('should have bar, area, pie, bell', function () {
        assert(graphs.has('bar'), 'has bar');
        assert(graphs.has('pie'), 'has pie');
        assert(graphs.has('area'), 'has area');
        assert(graphs.has('bell'), 'has bell');
      });
    });
  
    describe("aspect field", function () {
      it('should have aspects field', function () {
        Sfty.Util.Config.should.have.property('aspects');    
      });
    });
  
  });
  
  describe("Fn", function () {
  
    it('#access', function () {
      var element = { name: 'john' },
          fn      = Sfty.Util.Fn.access('name');
      
      assert(fn(element) === 'john', 'name should be hello'); 
    });
  
  });
});


