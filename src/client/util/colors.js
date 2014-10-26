Sfty.Util.Color = {

  /*
   * colorCurve :: [(Num, (RNum, GNum, BNum))] -> (Num -> Color)
   *
   * colorCurve([
   *   [0,  [225, 8,   119]],
   *   [20, [69,  243, 255]],
   *   [80, [0,   255, 246]],
   * ]);
   */
  colorCurve: function (colors) {
    var i, color;

    var rBuff = []; // [(Num, RNum)]
    var bBuff = []; // [(Num, BNum)]
    var gBuff = []; // [(Num, GNum)]

    for (i in colors) {
      color = colors[i];
      rBuff.push([color[0], color[1][0]]);
      gBuff.push([color[0], color[1][1]]);
      bBuff.push([color[0], color[1][2]]);
    }

    var r = Sfty.Util.Math.multiLinearPlot(rBuff);
    var g = Sfty.Util.Math.multiLinearPlot(gBuff);
    var b = Sfty.Util.Math.multiLinearPlot(bBuff);

    return function (i) {
      return new net.brehaut.Color([r(i), g(i), b(i)]);
    };
  },

};
