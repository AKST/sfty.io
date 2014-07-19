/** 
 * @jsx React.DOM 
 */


Sfty.View.InputGroup = React.createClass({

  getDefaultProps: function () {
    return {
      fieldTypes: {
        staticSelect: Sfty.View.Select, 
        ajaxSelect: Sfty.View.AJaxSelect, 
        toggle: Sfty.View.GroupButton, 
        slide: React.DOM.div, 
      }
    };
  },

  render: function () {
    var Header, groupInfo, name; 
    
    Header = Sfty.View.Type.UnderlinedHeader;
    name = "query-input-group";

    return (
      <section id={this.props.group.id} className={name}>
        <Header size="2" title={this.props.group.title} />
        {this.props.fields.map(function (field, index) {
          field = _.defaults(field, { key: index });
          return this.props.fieldTypes[field.type](field);
        }, this)}
      </section>
    );
  }

});

