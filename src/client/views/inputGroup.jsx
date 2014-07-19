/** 
 * @jsx React.DOM 
 */


Sfty.View.InputGroup = React.createClass({

  getDefaultProps: function () {
    return {
      fieldTypes: {
        staticSelect: Sfty.View.Select, 
        ajaxSelect: Sfty.View.AJaxSelect, 
        toggle: React.DOM.div, 
        slide: React.DOM.div, 
      }
    };
  },

  render: function () {
    var Header, groupInfo; 
    
    Header = Sfty.View.Type.UnderlinedHeader;

    return (
      <div id={this.props.group.id}>
        <Header size="2" title={this.props.group.title} />
        {this.props.fields.map(function (field, index) {
          field = _.defaults(field, { key: index });
          return this.props.fieldTypes[field.type](field);
        }, this)}
      </div>
    );
  }

});

