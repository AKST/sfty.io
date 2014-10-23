/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {

	return React.createClass({

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
        category: null,
        goBack: null,
        type: null,
        data: []
      };
    },

    componentDidMount: function() {
      var data = this.props.data;
      var category = this.props.category;

      var pieCxt = $('#pieChart');
      var width = $('#graph-column').width();

      pieCxt.attr('width', width);
      pieCxt.attr('height', width);

      Sfty.Visualisations.pieChart(data, pieCxt[0], category);

      var wCloud = $('#wordCloud');

      if (!Sfty.Util.isTabletOrSmaller()) {
        wCloud.attr('width', width);
        wCloud.attr('height', width);

        var wc = new Sfty.Visualisations.WordCloud(data, { size: width, type: category }); 
        wc.render(wCloud[0]);
      }
      else {
        wCloud.remove();
      }
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
