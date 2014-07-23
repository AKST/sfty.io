/**
 * @jsx React.DOM
 */

/**
 * Handles query builiding
 */
Sfty.View.QueryBuilder = React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
    };
  },

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
    var Header, constraints; 

    Header = Sfty.View.Type.UnderlinedHeader;
    constraints = !!(this.state.graph && this.state.comparison);

    return (
      <section className={this.props.className}>
        <Header size="3" text="Query Description"/> 
        <section className="row">
          <section className="col-md-6">
            {Sfty.View.Select(_.extend({ 
              onChange: this.update('graph') 
            }, Sfty.Config.field('graph')))}
          </section>
          <section className="col-md-6">
            {Sfty.View.Select(_.extend({ 
              onChange: this.update('comparison') 
            }, Sfty.Config.field('comparison')))}
          </section>
        </section>

        {constraints ? Sfty.View.ConstraintSelector({
          update: this.addConstraint, 
          comparison: this.state.comparison
        }) : null}
      </section>
    );
  } 

});
