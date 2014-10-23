Sfty.Util.Math = {

  randRange: function (min, max) {
    var all = Math.random() * 1000000;

    if (min >= 0 && max >= 0) {
      return (all % (max - min)) + min;
    }
    else if (min <= 0 && max <= 0) { 
      return (-(all % (max - min))) + max;
    }
    else if (min <= 0) { 
      return (all % (min - max)) + min;
    }
  },

  cap: function (val, min, max) {
    if (val > max) { return max; }
    if (val < min) { return min; }
    return val;
  },

  linearPlot: function (a, b) {
    var xa = a[0], ya = a[1]; 
    var xb = b[0], yb = b[1]; 
    var m = (yb - ya) / (xb - xa);
    return function (x) {
      return (m * (x - xa)) + ya;   
    };
  },
};

