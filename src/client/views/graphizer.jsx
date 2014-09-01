/**
 * @jsx React.DOM
 */

Sfty.View.Graphizer = React.createClass({

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
    return (
      <canvas id="aggregateChart" width="500" height="500"></canvas>
    );
  }

});
