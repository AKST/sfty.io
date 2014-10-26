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
      id: Sfty.Util.Rand.uid('dropdown'),
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

      <label htmlFor={this.props.id}>
        <b>{this.props.title}</b>
      </label>,

      React.DOM.select.apply(null, (function () {

        var elems = this.props.data.map(function (item) {
          return React.DOM.option({ value: item.id },
            Sfty.Util.Str.captialize(item.name)
          ); 
        });

        elems.unshift(<option>select an option</option>);
        elems.unshift({ 
          id: this.props.id, 
          ref: "selector",
          defaultValue: this.props.start || undefined 
        });

        return elems;
      }).call(this))
    );
  }

});
