/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {

	return React.createClass({

    lastRecordedWidth: null,

    wordcloudTimeoutTime: 1800,
    wordcloudTimeout: null,
    wordCloudInterval: null,
    resizeTimeout: null,

    propTypes: {
      goBack: React.PropTypes.func.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number,
        total: React.PropTypes.number
      })).isRequired,
      category: React.PropTypes.string,
    },

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
      var data = this.props.data;
      var category = this.props.category;

      var pieCxt = $('#pieChart');
      var width = $('#graph-column').width();

      pieCxt.attr('width', width);
      pieCxt.attr('height', width);

      Sfty.Visualisations.pieChart(data, pieCxt[0], {
        category: category,
        fancy: options.fancy        
      });

      if (!Sfty.Util.isTabletOrSmaller()) {
        var wCloud = $('#wordCloud');
        wCloud.attr('width', width);
        wCloud.attr('height', width);
        wCloud.hide();

        var wc = new Sfty.Visualisations.WordCloud(data, {
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
              <Legend data={this.props.data} category={this.props.category}/>
            </section>
          </section>
          <Button goBack={this.props.goBack} />
        </section>
      );
    }

  });
}());
