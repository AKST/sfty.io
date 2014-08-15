describe("Config", function () {

  it ('should have a title', function () {
    Sfty.Config.should.have.property('title');
  });

  it ('should have fields', function () {
    Sfty.Config.should.have.property('fields');
  }); 

  it ('should have fieldList', function () {
    Sfty.Config.should.have.property('fields');
  }); 

  it ('should have fieldGroups', function () {
    Sfty.Config.should.have.property('fieldGroups');
  });

  it ('should have a groupOrder', function () {
    Sfty.Config.should.have.property('groupOrder');
  });

  describe("graph field", function () {

    it('should have bar, area, pie, bell', function (done) {
      Sfty.Config.init().then(function () {

        var graphs = Sfty.Config.fields['graph'];
        
        assert(graphs.has('bar'), 'has bar');
        assert(graphs.has('pie'), 'has pie');
        assert(graphs.has('area'), 'has area');
        assert(graphs.has('bell'), 'has bell');
        
        done();

      }, function (err) {

        done(err);
      
      });
    });
  });

});
