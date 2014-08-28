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


  render: function () {
    var Header = Sfty.View.Type.UnderlinedHeader;

    return (
      <section className={this.props.className}>
        <Header size="3" text="Query Description"/> 
        <section className="row">
          <section className="col-md-6">

            {Sfty.View.Select(_.extend({ 
              onChange: this.props.updateGraph
            }, Sfty.Config.fields['graph']))}
          
          </section>
          <section className="col-md-6">
            
            {Sfty.View.Select(_.extend({ 
              onChange: this.props.updateComparison
            }, Sfty.Config.fields['comparison']))}
          
          </section>
        </section>

        {this.props.comparison ? Sfty.View.ConstraintSelector({
          update: this.props.addConstraint,
          comparison: this.props.comparison
        }) : null}
        
      </section>
    );
  } 

});
