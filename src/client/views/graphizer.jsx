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

  render: function () {

    return (
      <div>Graph?</div>
    );
  },

});