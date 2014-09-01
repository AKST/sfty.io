/** 
 * @jsx React.DOM 
 */


/**
 * Main View
 */
Sfty.View.App = React.createClass({

  getDefaultProps: function () {
    return {
      ready: false,
      title: Sfty.Config.title,
    };
  },

  getInitialState: function () {
    return {
      data: null,
      graph: null,
      comparison: null,
      constraints: {},
    };
  },

  updateField: function (key) {
    return function (value) {

      if (!(key in this.state)) {
        throw new Sfty.Err.KeyError(key);
      }

      var update = {};
      update[key] = value;

      this.setState(update);

    }.bind(this);
  },

  /**
   * Will handle updates, including removing constraint
   * fields altogether if they don't have any values left.
   *
   * @param field
   * @param value
   */
  removeConstraint: function (field, value) {
    // shallow copy
    var constraints = _.extend({}, this.state.constraints);

    if (!(field in constraints)) {
      throw new Sfty.Err.KeyError(field);
    }

    // remove value from field
    constraints[field] = _.without(constraints[field], value);

    // remove field if empty
    if (constraints[field].length === 0) {
      delete constraints[field];
    }

    this.setState({ constraints: constraints });
  },

  /**
   * Will update fields of constraint, and handle additive
   * updates from replacing updates.
   *
   * @param options
   */
  addConstraint: function (options) {
    var constraints = _.extend({}, this.state.constraints);
    var key = options.catergory;

    if (options.additive && constraints[key] !== undefined) {
      var combined = constraints[key].concat(options.__value);
      constraints[key] = _.uniq(combined);
    }
    else {
      constraints[key] = options.__value;
    }
    this.setState({ constraints: constraints });
  },

  /**
   * Is an event that is executed once the server responds 
   * to the query.
   */
  callback: function (data) {
    this.setState({ data: data });
  },
 
  /**
   * Query building view, this is only built once the
   * propety `ready` is true. getValue content is blank
   */
  renderQueryView: function () {
    var comparison = !!(this.state.graph && this.state.comparison) ?
      this.state.comparison :
      null;

    return React.DOM.section({},
      React.DOM.section({ className: "row" },
        Sfty.View.QueryBuilder({
          className: "col-md-6 col-sm-6",
          comparison: comparison,
          updateGraph: this.updateField('graph'),
          addConstraint: this.addConstraint
        }),
        Sfty.View.QueryPreviewer({
          className: "col-md-6 col-sm-6",
          removeConstraint: this.removeConstraint,
          constraints: this.state.constraints
        })
      ),
      Sfty.View.GoButton({
        graph: this.state.graph,
        constraints: this.state.constraints,
        comparison: this.state.comparison,
        endpoint: "/api/aggregate",
        callback: this.callback
      })
    );
  },


  renderVisualisation: function () {
    return Sfty.View.Graphizer({
      data: this.state.data,
      type: this.state.graph,
    });
  },

  /**
   * Builds main view
   */
  render: function () {
    var mainView =
      !!this.state.data ?

        // once data has been loaded from server
        this.renderVisualisation :

        // while forming query
        this.renderQueryView ;

    return (
      <section id="outer-app">
        <section id="app">
          <h1>{this.props.title} <i className="glyphicon glyphicon-signal" /></h1>
          {this.props.ready ? mainView() : null}
        </section>
      </section>
    );
  }

});

