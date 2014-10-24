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
      React.DOM.label({ htmlFor: this.props.id },
        React.DOM.b(null,this.props.title)
      ),
      // React.DOM.select.apply(null, (function () {
      //   var elems = [];

      //   elems.unshift({ id: this.props.id, defaultValue: this.props.start || undefined });
      //   elems.unshift(<option>select an option</option>);

      //   this.props.data.forEach(function (item) {
      //     elems.push(React.DOM.option({ value: item.id },
      //       Sfty.Util.Str.captialize(item.name)
      //     )); 
      //   }, this);

      //   return elems;
      // }).call(this))
      React.DOM.select({ id: this.props.id, defaultValue: this.props.start || undefined },
        <option value={null}><i>Select an option</i></option>,
        this.props.data.map(function (item, index) {
          var state = { 
            value: item.id, 
            key: this.props.title+"_"+index, 
          };
          console.log(state.key, this.props.start);
          return React.DOM.option(state,
            Sfty.Util.Str.captialize(item.name)
          );
        }, this)
      )

      // <select id={this.props.id} defaultValue={this.props.start}>
      //   <option>select an option</option>
      //   {this.props.data.map(function (item, index) {
      //     var state = { 
      //       value: item.id, 
      //       key: this.props.title+"_"+index, 
      //     };
      //     console.log(state.key, this.props.start);
      //     return React.DOM.option(state,
      //       Sfty.Util.Str.captialize(item.name)
      //     );
      //   }, this)}
      // </select>
    );
  })

});
