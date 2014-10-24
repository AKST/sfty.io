/** 
 * @jsx React.DOM 
 */

/**
 * Adds selectize support to select component
 */
Sfty.View.Mixin.Selectize = {

  __selectize_object: function () {
    return $('#'+this.props.id);
  },

  /**
   * If selectizeOptions is implemented on the
   * object implementing the Selectize mixin,
   * that will be called, getValue the options
   * will just be an empty object.
   */
  __getOptions: function () {
    var options = this.selectizeOptions ? 
      this.selectizeOptions() : {};

    return _.extend(options);
  },

  selectize: function () {
    var obj = this.__selectize_object();
    obj.selectize(this.__getOptions());
  },

};


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

  mixins: [Sfty.View.Mixin.Selectize],

  getDefaultProps: function () {
    return {
      id: Sfty.Util.Rand.uid('dropdown'),
      title: 'Untitled',
      start: null,
      data: [],
    };
  },

  selectizeOptions: function () {
    return {
      onChange: this.props.onChange,
    };
  },

  componentDidMount: function () {
    this.selectize();
  },

  render: Sfty.Util.Debug.skip("select", function () { 

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
        elems.unshift({ id: this.props.id, defaultValue: this.props.start || undefined });

        return elems;
      }).call(this))
    );
  })

});
