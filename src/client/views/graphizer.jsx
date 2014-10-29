/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = React.createClass({

  lastRecordedWidth: null,

  wordcloudTimeoutTime: 1800,
  wordcloudTimeout: null,
  wordCloudInterval: null,
  resizeTimeout: null,
  
  __color: null,

  getColor: function () { 
    if (this.__color !== null) { return this.__color; }

    var data = this.props.data.main;
    var tenth = (data.length-1) / 10;

    this.__color = Sfty.Util.Color.colorCurve([
      [0,         [255, 8,   119]],
      [tenth*0.5, [255, 0,   255]],
      [tenth*1,   [69,  243, 255]],
      [tenth*1.7, [81,  252, 87 ]],
      [tenth*3,   [246, 255, 0  ]],
      [tenth*9,   [255, 113, 13 ]],
    ]);

    return this.__color;
  },

  propTypes: (function () {
    var data = React.PropTypes.arrayOf(React.PropTypes.shape({
      _id: React.PropTypes.number,
      total: React.PropTypes.number
    }));

    return {
      goBack: React.PropTypes.func.isRequired,
      data: React.PropTypes.shape({
        main: data,
        male: data,
        female: data,
      }).isRequired,
      category: React.PropTypes.string,
    };
  }()),

  getDefaultProps: function() {
    return {
      category: null,
      goBack: null,
      data: null,
    };
  },

  componentDidMount: function () {
    this.renderGraph({ fancy: true }); 
    this.lastRecordedWidth = this.componentSize();
    $(window).on('resize', this.handleResize);
  },

  componentWillUnmount: function () {
    if (this.wordCloudInterval) {
      clearInterval(this.wordCloudInterval); 
    }
    $(window).off('resize', this.handleResize);
  },

  handleResize: function () {
    if (this.componentSize() === this.lastRecordedWidth) { return; }
    if (this.resizeTimeout) { clearTimeout(this.resizeTimeout); }

    this.lastRecordedWidth = this.componentSize();
    
    this.resizeTimeout = setTimeout(function () {
      if (this.wordCloudInterval) { clearInterval(this.wordCloudInterval); }
      this.renderGraph({ fancy: false }); 
    }.bind(this), 300);
  },

  componentSize: function () {
    return $(this.refs.self.getDOMNode()).width();
  },

  renderGraph: function (options) {
    var width = $(this.refs.graphColumn.getDOMNode()).width();
    var data = this.props.data.main;
    var category = this.props.category;

    var pieCxt = $(this.refs.pieChart.getDOMNode())
      .attr('width', width)
      .attr('height', width)[0];

    var barCxt = $(this.refs.barChart.getDOMNode())
      .attr('width', width)
      .attr('height', width)[0];

    Sfty.Visualisations.pieChart(data, pieCxt, {
      category: category,
      fancy: options.fancy,        
      color: this.getColor(), 
    });

    Sfty.Visualisations.barChart([
      ["Male",  "#2949FF", this.props.data.male],  
      ["Female", "#FF1CE1", this.props.data.female],  
    ], barCxt, {
      category: category
    });

    if (!Sfty.Util.isTabletOrSmaller()) {
      var wCloud = $(this.refs.wordCloud.getDOMNode())
        .attr('width', width)
        .attr('height', width)
        .hide();

      var wc = new Sfty.Visualisations.WordCloud(data, { size: width, type: category }); 

      if (this.wordcloudTimeout) return;

      setTimeout(function () {
        this.wordcloudTimeout = null;
        this.wordCloudInterval = wc.render(wCloud[0]);
        wCloud.fadeIn({ duration: 600 });
      }.bind(this), this.wordcloudTimeoutTime);
    }
    else {
      $(this.refs.wordCloud.getDOMNode()).remove();
    }
  },

  render: function () {
    var Header = Sfty.View.Type.UnderlinedHeader;
    var Button = Sfty.View.GoBackButton;
    var Legend = Sfty.View.Legend;

    return (
      <section ref="self">
        <section className="row">
          <section ref="graphColumn" className="col-md-6 col-sm-6">
            <Header size="3" text={"Comparing " + this.props.category} />
            <canvas ref="pieChart" width="300" height="300"></canvas>
            <canvas ref="barChart" width="300" height="300"></canvas>
            <canvas ref="wordCloud" width="300" height="300"></canvas>
          </section>
          <section className="col-md-6 col-sm-6">
            <Header size="3" text="Legend"/>
            <Legend data={this.props.data.main} category={this.props.category} color={this.getColor()}/>
          </section>
        </section>
        <Button goBack={this.props.goBack} />
      </section>
    );
  }

});
