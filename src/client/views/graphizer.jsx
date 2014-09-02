/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {

  var colors = [
    "#FF5A5E", "#FFC870", 
    "#5AD3D1", "#CD5C5C", 
    "#BDB76B", "#6B8E23", 
    "#008000", "#008B8B", 
    "#6A5ACD"
  ];

	var pieChart = function(data, ctx, category){
		var contx = ctx.getContext("2d");

		var mydata = data.map(function (record, index){
			return {
				value: record.total,
				color: colors[index % colors.length],
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
