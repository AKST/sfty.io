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
      interval: null,
      id: Date.now().toString(),
      category: null,
      goBack: null,
      type: null,
      data: []
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
    var data = this.props.data.main;
    var category = this.props.category;

    var pieCxt = $('#pieChart');
    var width = $('#graph-column').width();

    pieCxt.attr('width', width);
    pieCxt.attr('height', width);

    Sfty.Visualisations.pieChart(data, pieCxt[0], {
      category: category,
      fancy: options.fancy,        
      color: this.getColor(), 
    });

    if (!Sfty.Util.isTabletOrSmaller()) {
      var wCloud = $('#wordCloud');
      wCloud.attr('width', width);
      wCloud.attr('height', width);
      wCloud.hide();

      var wc = new Sfty.Visualisations.WordCloud(data, {
        //color: this.getColor(),
        size: width, 
        type: category 
      }); 
      if (this.wordcloudTimeout) return;
      setTimeout(function () {
        this.wordcloudTimeout = null;
        this.wordCloudInterval = wc.render(wCloud[0]);
        wCloud.fadeIn({ duration: 600 });
      }.bind(this), this.wordcloudTimeoutTime);
    }
    else {
      $('#wordCloud').remove();
    }
  },

  render: function () {
    var Header = Sfty.View.Type.UnderlinedHeader;
    var Button = Sfty.View.GoBackButton;
    var Legend = Sfty.View.Legend;

    return (
      <section id={this.props.id} ref="self">
        <section className="row">
          <section id="graph-column" className="col-md-6 col-sm-6">
            <Header size="3" text={"Comparing " + this.props.category} />
            <canvas id="pieChart" width="300" height="300"></canvas>
            <canvas id="wordCloud" width="300" height="300"></canvas>
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
