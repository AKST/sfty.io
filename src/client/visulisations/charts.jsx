/**
 * @jsx React.DOM
 */

Sfty.Visualisations.pieChart = function(data, ctx, category){
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

Sfty.Visualisations.barChart = function(data, ctx, category){
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

Sfty.Visualisations.areaChart = function(data, ctx, category){
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


