/**
 * @jsx React.DOM
 */

Sfty.Visualisations.pieChart = function (data, ctx, options){
  "use strict";
	var contx = ctx.getContext("2d");

	var mydata = data.map(function (record, i){
		return {
			value: record.total,
      color: options.color(i).toCSS(), //Sfty.Config.calcGraphColor(i),
      //label: Sfty.Config.lookupId({ id: record._id, category: options.category, property: "name" })
		};
	});

  var graphOptions = {
    segmentShowStroke : true,
    segmentStrokeColor : "white",
    segmentStrokeWidth : 2,
    percentageInnerCutout : 50,
		tooltipFontSize: 11,
	};

  if (options.fancy) {
    graphOptions.animationEasing = "easeOutBounce";
    graphOptions.animationSteps = 100;
    graphOptions.animateRotate = true;
    graphOptions.animateScale = false;
  }

	// The type of char you want to draw. This case is a pie chart
	new Chart(contx).Pie(mydata, graphOptions);
};

/*
 * data: [(Name, Color, {String: Num})]
 * ctx:  <canvas DomElement>
 * options: { category: String }
 */
Sfty.Visualisations.barChart = function (data, ctx, options){
  "use strict";
	var contx = ctx.getContext("2d");

  var labels = data[0][2].map(function (record, index) {
    return ' ';
  });

  var values = data.map(function (set) {
    return {
      label: set[0],
      fillColor: set[1],
      data: _.pluck(set[2], "total"),
    };
  });

  new Chart(contx).Bar({
    labels: labels,
    datasets: values,
  }, {});
};

Sfty.Visualisations.areaChart = function (data, ctx, category){
	var contx = document.getElementById("aggregateChart").getContext("2d");

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


