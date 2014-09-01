/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = (function () {


  

  return React.createClass({

    propTypes: {
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        _id: React.PropTypes.number,
        total: React.PropTypes.number
      })).isRequired,
      type: React.PropTypes.oneOf([
        'bar', 'pie', 'word',
        'bell', 'area',
      ]).isRequired,
    },

    getDefaultProps: function(){
      return{
        type: null,
        data: [],
      };
    },

    componentDidMount: function(){
      switch (this.getDefaultProps.type) {

      }
    },

    render: function () {
      var Header = Sfty.View.Type.UnderlinedHeader;
      return (
        <section className="row">
          <section className="col-md-6 col-sm-6">
            <Header size="3" text="TA DAAARR"/> 
            <canvas id="aggregateChart" width="500" height="500"></canvas>
          </section>
          <section className="col-md-6 col-sm-6">
            <Header size="3" text="Legend"/> 
            <p>Preview</p>
          </section>
        </section>
      );
    }

  });
}());
