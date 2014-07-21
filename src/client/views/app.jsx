/** 
 * @jsx React.DOM 
 */


/**
 *
 * State
 *  - graph (graph id)
 *  - comparison (comparison id)
 *  - constraint objects
 *      categoryName
 *      valueId
 */
Sfty.View.App = React.createClass({

  getDefaultProps: function () {
    return {
      title: 'Your App',
    };
  },

  getInitialState: function () {
    return { 
      comparison: null,
      graph: null,
      constraints: [],
    };
  },

  update: function (field) {
    return function (value) {
      var update = {};
      update[field] = value;
      this.setState(update);
    }.bind(this);
  },

  addConstraint: function () {

  },

  render: function () {
    var Footer, Header, Select, Constrainer, 
      graph, compare, allowConstraints; 
    
    Footer = Sfty.View.Footer;
    Header = Sfty.View.Type.UnderlinedHeader;
    Select = Sfty.View.Select;
    Constrainer = Sfty.View.ConstraintSelector;

    compare = Sfty.Config.field('comparison');
    graph = Sfty.Config.field('graph');
    allowConstraints = this.state.graph && this.state.comparison;

    return (
      <section id="outer-app">
        <section id="app">
          <h1>{this.props.title} <i className="glyphicon glyphicon-signal" /></h1>

          <section className="row">
            <section className="col-md-6">
              <Header size="3" text="Query Description"/> 
              {/* picks graph */}
              {Select(_.extend({ update: this.update('graph') }, graph))}

              {/* picks comparison */}
              {Select(_.extend({ update: this.update('comparison') }, compare))}

              {/* adds a constraint */}
              {allowConstraints ? <Constrainer update={this.update}/> : undefined}
            </section>
            <section className="col-md-6">
              <Header size="3" text="Query State"/> 
            </section>
          </section>

          <a className="lanuch-query">
            Run Query <i className="glyphicon glyphicon-signal" />
          </a>
        </section>
      </section>
    );
  }

});

