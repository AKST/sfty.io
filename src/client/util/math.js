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

  multiLinearPlot: function (lines) {
    var equations = []; // [(min, max, equation)] 
    var left, right, eq;

    var lastIndex = lines.length-2;

    var min = lines[0][0];
    var max = lines[lastIndex][0];

    for (var i = 0; i < lines.length-1; i++) {
      left  = lines[i]; 
      right = lines[i+1]; 
      eq    = this.linearPlot(left, right); 

      equations.push([left[0], right[0], eq]);
    }

    return function (x) {
      if (x >= min && max >= x) {
        var i, eq;
        for (i in equations) {
          eq = equations[i]; 
          if (!(x >= eq[0] && eq[1] >= x)) { continue; } 
          return eq[2](x);
        }
      }
      else if (x < min) {
        return equations[0][2](x);        
      }
      else if (x > max) {
        return equations[lastIndex][2](x);        
      }
    };
  },

};

