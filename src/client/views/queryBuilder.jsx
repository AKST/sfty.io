/**
 * @jsx React.DOM
 */

/**
 * interface for builiding query
 *
 * Acts as a proxy between the fields, the main application
 * state, & the selector fields.
 */
Sfty.View.QueryBuilder = React.createClass({

  getDefaultProps: function () {
    return {
      comparison: null,
      onChange: function () {},
      updateComparison: function () {},
      updateGraph: function () {},
      addConstraint: function () {},
    };
  },

  renderConstraintSelector: function () {
    var constraintOptions = {
      update: this.props.addConstraint,
      comparison: this.props.comparison
    };

    if (!!this.props.comparison) {
      return Sfty.View.ConstraintSelector(constraintOptions);
    }
    else {
      return null;
    }
  },

  render: Sfty.Util.Debug.skip("queryBuilder", function () {

    var Header = Sfty.View.Type.UnderlinedHeader;
    var Select = Sfty.View.Select;

    var graph = Sfty.Config.fields.graph;
    var comparison = Sfty.Config.fields.comparison;

    console.log(this.props.comparison);

    return (
      <section className={this.props.className}>
        <Header size="3" text="Query Description"/> 
        <Select 
          title={comparison.title} 
          data={comparison.data} 
          start={this.props.comparison}
          onChange={this.props.updateComparison}/>

         {this.renderConstraintSelector()}
        
      </section>
    );
  })

});
