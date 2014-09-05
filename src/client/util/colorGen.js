Sfty.Util.genColor = (function () {

  return function gen(n) {
    var acc = [];
    
    for (var i = 0; i < n; i++) {
      acc.push({

      });
    }
    
    return acc.map(Please.make_color.bind(Please));
  };
}());