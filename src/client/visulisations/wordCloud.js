Sfty.Visualisations.WordCloud = (function () {

  var linearPlot = Sfty.Util.Math.linearPlot;
  var randRange = Sfty.Util.Math.randRange;
  var cap = Sfty.Util.Math.cap;

  var greyScale = function (v) {
    var hex = v.toString(16);
    if (parseInt(hex, 16) >= parseInt(100, 16)) {
      hex = "ff";
    }
    hex = hex.length === 1 ? "0" + hex : hex;
    return "#" + hex + hex + hex;
  };

  /* 
   * X & Y are position data
   *
   * Z is rotation data
   */
  return ClassExtender.extend({

    init: function (data, config) {
      if (!config) config = {};
      var n = data.length;  

      this.type = config.type;
      this.size = config.size;

      this.font = config.font || 'Helvetica';
      this.darkest = config.darkest || 0;
      this.lightest = config.lightest || 230;
      this.interval = config.interval || 1000 / 60;
      this.minfont = config.minfont || 8;
      this.maxfont = config.maxfont || 28;

      this.__data = data;

      this.__xPos = new Float32Array(data.length);
      this.__yPos = new Float32Array(data.length);
      this.__angle = new Float32Array(data.length);

      this.__xVel = new Float32Array(data.length);
      this.__yVel = new Float32Array(data.length);
      this.__rateOfRotation = new Float32Array(data.length);

      this.__blur = [];
      this.__text = [];
      this.__fonts = [];
      this.__colors = [];

      this.__depth = new Float32Array(data.length);
      this.__shadow = new Float32Array(data.length);

      this.__prepared = false;
    },
    
    render: function (context) {
      if (!this.__prepared) { 
        this.__prepared = true;
        this.__prepare(); 
      }

      var contx = context.getContext("2d");
      contx.textAlign = "center";
      contx.textBaseline = "middle";

      var loop = this.__renderLoop.bind(this, contx);
      loop();

      return setInterval(loop, this.interval);
    },

    __prepare: function () {
      this.__data = _.sortBy(this.__data, "total");

      var lowest = Infinity;
      var highest = -Infinity;

      var lrOffset = this.size / 5;
      var tbOffset = this.size / 20;
      var lBoarder = lrOffset;
      var bBoarder = tbOffset;
      var rBoarder = this.size - lrOffset;
      var tBoarder = this.size - tbOffset;

      // initialise x,y,z position & velocity
      this.__data.forEach(function (row, i) {
        if (row.total < lowest) { lowest = row.total; }
        if (row.total > highest) { highest = row.total; }

        this.__xVel[i] = randRange(-1, 1) > 0 ? 0.1 : -0.1;
        this.__yVel[i] = randRange(-1, 1) > 0 ? 0.1 : -0.1;
        this.__rateOfRotation[i] = 0;

        this.__xPos[i] = randRange(lBoarder, rBoarder);
        this.__yPos[i] = randRange(bBoarder, tBoarder);
        this.__angle[i] = randRange(-1, 1);

        this.__text[i] = Sfty.Config.lookupId({
          id: row._id,
          category: this.type,
          property: "name",
        });
      }, this);

      if (highest === lowest) {
        lowest = lowest - 1;
      }
      
      var fontSize  = linearPlot([lowest, this.minfont], [highest, this.maxfont]);
      var greyPlot  = linearPlot([lowest, this.lightest], [highest, this.darkest]);
      var depthPlot = linearPlot([lowest, 0.1], [highest, 1]);
      var shadowP   = linearPlot([lowest, 2.5], [highest, 0]);

      // initialise anyt that requires knowledge of min & max
      this.__data.forEach(function (row, i) {
        var size = fontSize(row.total);
        if (size > this.maxfont) { 
          console.log([size, this.maxfont], [row.total, highest]);
          size = this.maxfont; 
        }
        this.__fonts[i] = "bold " + size + "px  " + this.font; 
        this.__colors[i] = greyScale(Math.round(greyPlot(row.total)));
        this.__shadow[i] = shadowP(row.total);
        this.__depth[i] = depthPlot(row.total);
      }, this);
    },

    __renderLoop: function (contx) {
      contx.fillStyle = "#fff";
      contx.fillRect(0, 0, this.size, this.size);
      contx.fillStyle = "#000";

      for (var i = 0; i < this.__data.length; i++) {
        contx.save();
        contx.font = this.__fonts[i];
        contx.fillStyle = this.__colors[i];
        contx.translate(this.__xPos[i], this.__yPos[i]);
        contx.rotate(this.__angle[i]);

        contx.shadowBlur = this.__shadow[i]; 
        contx.shadowColor = this.__colors[i];

        contx.fillText(this.__text[i], 0, 0);

        contx.restore();

        this.__xVel[i] += randRange(-0.03, 0.03);
        this.__yVel[i] += randRange(-0.03, 0.03);
        this.__rateOfRotation[i] += randRange(-0.0001, 0.0001);

        // speed up movement in relation to depth
        this.__xPos[i] += this.__xVel[i] * this.__depth[i];
        this.__yPos[i] += this.__yVel[i] * this.__depth[i];

        this.__angle[i] += this.__rateOfRotation[i];

        // keeps within x axis of canvas
        if (this.__xPos[i] < 0 && this.__xVel[i] < 0) { 
          this.__xVel[i] *= -1;
        } 
        else if (this.__xPos[i] > this.size && this.__xVel[i] > 0) {
          this.__xVel[i] *= -1;
        }

       
        // keeps within y axis of canvas
        if (this.__yPos[i] < 0 && this.__yVel[i] < 0) {
          this.__yVel[i] *= -1;
        } 
        else if (this.__yPos[i] > this.size && this.__yVel[i] > 0) {
          this.__yVel[i] *= -1;
        }
      }
    },

  });
}());


