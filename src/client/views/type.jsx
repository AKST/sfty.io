/** 
 * @jsx React.DOM 
 */

Sfty.View.Type = {

  UnderlinedHeader: React.createClass({
    render: function () {
      var tagName = 'h'+(this.props.size || 1),
          HTag = React.DOM[tagName];

      return (
        <div className="page-header">
          <HTag>{this.props.text}</HTag>
        </div>
      );
    }
  })

};
