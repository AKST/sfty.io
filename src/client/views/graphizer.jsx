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
      type: React.PropTypes.oneOf([
        'bar', 'pie', 'word',
        'bell', 'area',
      ]).isRequired,
    },

    getDefaultProps: function(){
      return{
        goBack: null,
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
      var Button = Sfty.View.GoBackButton;

      return (
        <section>
          <section className="row">
            <section className="col-md-6 col-sm-6">
              <Header size="3" text="TA DAAARR"/> 
              <canvas id="aggregateChart" width="300" height="300"></canvas>
            </section>
            <section className="col-md-6 col-sm-6">
              <Header size="3" text="Legend"/>
            </section>
          </section>
          <Button goBack={this.props.goBack} />
        </section>
      );
    }

  });
}());
