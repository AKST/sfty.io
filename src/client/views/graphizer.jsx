/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {

  var randRange = function (min, max) {
    var r, all = Math.random() * 1000000;

    if (min > 0 && max > 0) {
      return (all % (max - min)) + min;
    }
    else if (min < 0 && max < 0) { 
      return (-(all % (max - min))) + max;
    }
    else if (min < 0) { 
      return (all % (min - max)) + min;
    }
  };

  var cap = function (val, min, max) {
    if (val > max) return max;
    if (val < min) return min;
    return val;
  };

  var color = function (val, min, max) {
    
  };

  var wordCloud = function (data, ctx, category, size) {

    var names = data.map(function (row) {
      return Sfty.Config.lookupId({
        id: row._id,
        category: category,
        property: "name",
      });     
    });
  
    var xVelocity = new Float32Array(data.length);
    var yVelocity = new Float32Array(data.length);

    var xVals = new Float64Array(data.length);
    var yVals = new Float64Array(data.length);

    var lrOffset = size / 5;
    var tbOffset = size / 20;
    var lBoarder = lrOffset;
    var bBoarder = tbOffset;
    var rBoarder = size - lrOffset;
    var tBoarder = size - tbOffset;


    var elemSize = 10;
    var elemHSize = elemSize / 2;

    var lowerest = Infinity;
    var highest  = -Infinity;

    data.forEach(function (row, index) {
      if (row.value < lowerest) { lowerest = row.value; }
      if (row.value > highest) { highest = row.value; }
      xVelocity[index] = randRange(-1, 1) > 0 ? 0.1 : -0.1; 
      yVelocity[index] = randRange(-1, 1) > 0 ? 0.1 : -0.1; 
      xVals[index] = randRange(lBoarder, rBoarder); 
      yVals[index] = randRange(bBoarder, tBoarder); 
    });

    data = _.sortBy(data, "value");

		var contx = ctx.getContext("2d");

    contx.textAlign = "center";
    contx.font = "bold 16px Helvetica";

    var eventLoop = function () {
      contx.fillStyle = "#fff";
      contx.fillRect(0, 0, size, size);

      contx.fillStyle = "#000";

      for (var i = 0, elem; i < data.length; i++) {
        elem = data[i];

        contx.fillText(names[i],
          xVals[i] - elemHSize, 
          yVals[i] - elemHSize);

        xVelocity[i] = cap(randRange(-0.05, 0.05) + xVelocity[i], -0.1, 0.1);
        yVelocity[i] = cap(randRange(-0.05, 0.05) + yVelocity[i], -0.1, 0.1);
        xVals[i] += xVelocity[i];
        yVals[i] += yVelocity[i];
      }
    };

    eventLoop();

    return setInterval(eventLoop, 1000 / 60);
  };


	var pieChart = function(data, ctx, category){
		var contx = ctx.getContext("2d");

		var mydata = data.map(function (record, index){
			return {
				value: record.total,
				color: Sfty.Config.calcGraphColor(index),
				highlight: "#DDA0DD" ,
				label: Sfty.Config.lookupId({
					id: record._id,
					category: category,
					property: "name"
				})
			};
		});

		var options = {
	    segmentShowStroke : true,
	    segmentStrokeColor : "white",
	    segmentStrokeWidth : 2,
	    percentageInnerCutout : 50,
	    animationSteps : 100,
	    animationEasing : "easeOutBounce",
	    animateRotate : true,
	    animateScale : false,
			tooltipFontSize: 11,
		};

		// The type of char you want to draw. This case is a pie chart
		var myPieChart = new Chart(contx).Pie(mydata, options);
	};

	var barChart = function(data, ctx, category){
		var contx = document.getElementById("aggregateChart").getContext("2d");

		var mydata = data.map(function (record){
			return {
				value: record.total,
				label: Sfty.Config.lookupId({
					id: record._id,
					category: category,
					property: "name"
				})
			};
		});

		var barlabels = _.pluck(mydata, 'label');
		var bardatavalues = _.pluck(mydata, 'value');

		var barChart = {
	    labels: barlabels,
	    datasets: [{
        label: "My First dataset",
        fillColor: "blue",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: bardatavalues
		  }]
		};

		
		var options = {
	    scaleBeginAtZero : true,
	    scaleShowGridLines : true,
	    scaleGridLineColor : "rgba(0,0,0,.05)",
	    scaleGridLineWidth : 1,
	    barShowStroke : true,
	    barStrokeWidth : 2,
	    barValueSpacing : 5,
	    barDatasetSpacing : 1,
		};
		var myBarChart = new Chart(contx).Bar(barChart, options);
	};

	var areaChart = function(data, ctx, category){
		var contx=document.getElementById("aggregateChart").getContext("2d");

		var mydata = data.map(function (record, index){
			return {
				value: record.total,
				color: Sfty.Config.calcGraphColor(index),
				highlight: "#DDA0DD" ,
				label: Sfty.Config.lookupId({
					id: record._id,
					category: category,
					property: "name"
				})
			};
		});

		var options = {
			scaleShowLabelBackdrop : true,
			scaleBackdropColor : "rgba(255,255,255,0.75)",
			scaleBeginAtZero : true,
			scaleBackdropPaddingY : 2,
			scaleBackdropPaddingX : 2,
			scaleShowLine : true,
			segmentShowStroke : true,
			segmentStrokeColor : "#fff",
			segmentStrokeWidth : 2,
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : true,
			animateScale : false,
		};

		var myAreaChart = new Chart(contx).PolarArea(mydata, options);
	};

  return React.createClass({

    propTypes: {
      goBack: React.PropTypes.func.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number,
        total: React.PropTypes.number
      })).isRequired,
      category: React.PropTypes.string,
    },

    getDefaultProps: function(){
      return{
        category: null,
        goBack: null,
        type: null,
        data: []
      };
    },

    componentDidMount: function(){
      var data = this.props.data;
      var category = this.props.category;

      var pieCxt = $('#pieChart');
      var wCloud = $('#wordCloud');
      var width = $('#graph-column').width();

      pieCxt.attr('width', width);
      pieCxt.attr('height', width);
      wCloud.attr('width', width);
      wCloud.attr('height', width);

      pieChart(data, pieCxt[0], category);
      wordCloud(data, wCloud[0], category, width);

      // switch (this.props.type) {
      // 	case 'pie':
      //     pieChart(data, ctx, category);
      //     pieChart(data, ctx, category);
      // 		break;
      // 	case 'bar':
      // 		barChart(data, ctx, category);
      // 		break;
      // 	case 'area':
      // 		areaChart(data, ctx, category);
      // 		break;
      // 	default: 
      // 		throw new TypeError(this.props.type + ' is not a supported chart.');
      // }
    },

    render: function () {
      var Header = Sfty.View.Type.UnderlinedHeader;
      var Button = Sfty.View.GoBackButton;
      var Legend = Sfty.View.Legend;

      return (
        <section>
          <section className="row">
            <section id="graph-column" className="col-md-6 col-sm-6">
              <Header size="3" text={"Comparing " + this.props.category} />
              <canvas id="pieChart" width="300" height="300"></canvas>
              <canvas id="wordCloud" width="300" height="300"></canvas>
            </section>
            <section className="col-md-6 col-sm-6">
              <Header size="3" text="Legend"/>
              <Legend data={this.props.data} category={this.props.category}/>
            </section>
          </section>
          <Button goBack={this.props.goBack} />
        </section>
      );
    }

  });
}());
