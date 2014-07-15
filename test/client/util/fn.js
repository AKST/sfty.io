
describe("Sfty.Fn", function () {

  it('#access', function () {
    var element = { name: 'john' },
        fn      = Sfty.Fn.access('name');
    
    assert(fn(element) === 'john', 'name should be hello'); 
  });

});
