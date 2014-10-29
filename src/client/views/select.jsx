/** 
 * @jsx React.DOM 
 */


/**
 * Used represent a dropdown selection component
 *
 * Has properties
 *   title [String]: the labels name
 *   data  [Object Array]: a list of objects to represent the options
 *     name [String]: what the user sees as the value
 *     id   [String]: the internal value
 */
Sfty.View.Select =  React.createClass({

  getDefaultProps: function () {
    return {
      title: 'Untitled',
      start: null,
      data: [],
    };
  },

  componentDidMount: function () {
    var obj = $(this.refs.selector.getDOMNode());
    obj.selectize({
      onChange: this.props.onChange,
    });
  },

  render: function () { 
    return React.DOM.section({ className:"query-field" }, 

      <label><b>{this.props.title}</b></label>,

      React.DOM.select.apply(null, (function () {
        var elem, name, elems = [];
        
        for (var i in this.props.data) {
          elem = this.props.data[i];
          name = Sfty.Util.Str.captialize(elem.name);
          elems.push(<option value={elem.id}>{name}</option>);
        }

        elems.unshift(<option>select an option</option>);
        elems.unshift({ 
          ref: "selector",
          defaultValue: this.props.start || undefined 
        });

        return elems;
      }).call(this))
    );
  }

});
