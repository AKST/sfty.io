/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {

	var pieChart = function(data, ctx, category){
		var contx = ctx.getContext("2d");
		var colors = ["#FF5A5E", "#FFC870", "#5AD3D1", "#CD5C5C", "#BDB76B", "#6B8E23", "#008000", "#008B8B", "#6A5ACD"];

		var mydata = data.map(function (x, i){
			return {
				value: x.total,
				color: colors[i % colors.length],
				highlight: "#DDA0DD" ,
				label: Sfty.Config.lookupId({
					id: x._id,
					category: category,
					property: "name"
				})
			};
		});

		var options = {
	    //Boolean - Whether we should show a stroke on each segment
	    segmentShowStroke : true,

	    //String - The colour of each segment stroke
	    segmentStrokeColor : "white",

	    //Number - The width of each segment stroke
	    segmentStrokeWidth : 2,

	    //Number - The percentage of the chart that we cut out of the middle
	    percentageInnerCutout : 50, // This is 0 for Pie charts

	    //Number - Amount of animation steps
	    animationSteps : 100,

	    //String - Animation easing effect
	    animationEasing : "easeOutBounce",

	    //Boolean - Whether we animate the rotation of the Doughnut
	    animateRotate : true,

	    //Boolean - Whether we animate scaling the Doughnut from the centre
	    animateScale : false,

	    // Number - Tooltip label font size in pixels
			tooltipFontSize: 11,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
		};

		// The type of char you want to draw. This case is a pie chart
		var myPieChart = new Chart(contx).Pie(mydata, options);
	};

	var barChart = function(data, ctx){
				var contx = document.getElementById("aggregateChart").getContext("2d");
				var colors = ["#FF5A5E", "#FFC870", "#5AD3D1", "#CD5C5C", "#BDB76B", "#6B8E23", "#008000", "#008B8B", "#6A5ACD"];

				var mydata = data.map(function (x, i){
					return {
						value: x.total,
						label: Sfty.Config.lookupId(
						{
							id: x._id,
							category: "cause",
							property: "name"
						})
					};
				});

				var barlabels = _.pluck(mydata, 'label');
				var bardatavalues = _.pluck(mydata, 'value');

				var barChart = {
				    labels: barlabels,
				    datasets: [
				        {
				            label: "My First dataset",
				            fillColor: "blue",
				            strokeColor: "rgba(220,220,220,0.8)",
				            highlightFill: "rgba(220,220,220,0.75)",
				            highlightStroke: "rgba(220,220,220,1)",
				            data: bardatavalues
				        }
				    ]
				};

				
				var options = {
				    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				    scaleBeginAtZero : true,

				    //Boolean - Whether grid lines are shown across the chart
				    scaleShowGridLines : true,

				    //String - Colour of the grid lines
				    scaleGridLineColor : "rgba(0,0,0,.05)",

				    //Number - Width of the grid lines
				    scaleGridLineWidth : 1,

				    //Boolean - If there is a stroke on each bar
				    barShowStroke : true,

				    //Number - Pixel width of the bar stroke
				    barStrokeWidth : 2,

				    //Number - Spacing between each of the X value sets
				    barValueSpacing : 5,

				    //Number - Spacing between data sets within X values
				    barDatasetSpacing : 1,

				    //String - A legend template
				    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				};
				var myBarChart = new Chart(contx).Bar(barChart, options);
	};

  return React.createClass({

    propTypes: {
      goBack: React.PropTypes.func.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number,
        total: React.PropTypes.number
      })).isRequired,
      type: React.PropTypes.oneOf([
        'bar', 'pie', 'word',
        'bell', 'area',
      ]).isRequired,
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
    	var ctx = $('#aggregateChart')[0];
      var data = this.props.data;
      var category = this.props.category;

      switch (this.props.type) {
      	case 'pie':
      		pieChart(data, ctx, category);
      		break;
      	case 'bar':
      		barChart(data, ctx, category);
      		break;
      	default:
      		throw new TypeError(this.props.type+'is not a supported chart.');
      }
    },

    render: function () {
      var Header = Sfty.View.Type.UnderlinedHeader;
      var Button = Sfty.View.GoBackButton;
      var Legend = Sfty.View.Legend;

      return (
        <section>
          <section className="row">
            <section className="col-md-6 col-sm-6">
              <Header size="3" text="TA DAAARR"/> 
              <canvas id="aggregateChart" width="300" height="300"></canvas>
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
