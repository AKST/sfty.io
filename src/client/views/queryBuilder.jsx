/**
 * @jsx React.DOM
 */

/**
 * interface for builiding query
 */
Sfty.View.QueryBuilder = React.createClass({


  getDefaultProps: function () {
    return {
      onChange: function () {},
    };
  },


  /**
   * constraints: a dictionary object that has keys
   *   for the constraint parameter & the values as the
   *   value of parameter.
   */
  getInitialState: function () {
    return { 
      comparison: null,
      graph: null,
      constraints: {},
    };
  },


  update: function (field) {
    return function (value) {
      this.__update(field, value);
    }.bind(this);
  },


  addConstraint: function (options) {
    var constraints; 

    constraints = _.extend({}, this.state.constraints); 
    constraints[options.catergory] = options.value;
  
    this.__update('constraints', constraints);
  },


  __update: function (field, value) {
    var update, newState; 

    update = {};
    update[field] = value;

    this.setState(update);

    newState = _.extend({}, this.state);
    newState[field] = value;

    this.props.onChange(newState);
  },


  render: function () {
    var Header, visualChoosen; 

    Header = Sfty.View.Type.UnderlinedHeader;
    visualChoosen = Boolean(this.state.graph && this.state.comparison);

    return (
      <section className={this.props.className}>
        <Header size="3" text="Query Description"/> 
        <section className="row">
          <section className="col-md-6">

            {Sfty.View.Select(_.extend({ 
              onChange: this.update('graph') 
            }, Sfty.Config.fields['graph']))}
          
          </section>
          <section className="col-md-6">
            
            {Sfty.View.Select(_.extend({ 
              onChange: this.update('comparison') 
            }, Sfty.Config.fields['comparison']))}
          
          </section>
        </section>

        {visualChoosen ? Sfty.View.ConstraintSelector({
          update: this.addConstraint, 
          comparison: this.state.comparison
        }) : null}
        
      </section>
    );
  } 

});
