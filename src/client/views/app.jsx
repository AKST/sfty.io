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
      graph: null,
      comparison: null,
      constraints: {},
    };
  },

  updateState: function (update) {
    for (var key in update) {
      if (!(key in this.state)) {
        throw new Sfty.Err.KeyError(key);
      }
    }

    this.setState(update);
  },

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
   * Is an event that is executed once the server responds 
   * to the query.
   */
  callback: function (data) {

  },

  /**
   * Builds main view
   */
  render: function () {
    /**
     * Query building view, this is only built once the 
     * propety `ready` is true. getValue content is blank
     */
    var onReady = function () {
      var Previewer, Builder, GoButton; 

      Builder = Sfty.View.QueryBuilder;
      Previewer = Sfty.View.QueryPreviewer;
      GoButton = Sfty.View.GoButton;


      return (
        <section>

          <section className="row">
            <Builder className="col-md-6 col-sm-6" onChange={this.updateState}/>

            {Previewer(_.extend({ 
              className: "col-md-6 col-sm-6",
              removeConstraint: this.removeConstraint
            }, this.state))}
          </section>

          <GoButton 
              data={this.state.constraints} 
              comparison={this.state.comparison}
              endpoint="/api/aggregate"
              callback={this.callback} />
        </section>
      );
    };

    return (
      <section id="outer-app">
        <section id="app">
          <h1>{this.props.title} <i className="glyphicon glyphicon-signal" /></h1>
          {this.props.ready ? onReady.call(this) : null}
        </section>
      </section>
    );
  }

});

