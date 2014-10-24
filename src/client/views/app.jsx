/** 
 * @jsx React.DOM 
 */


/**
 * Main View
 */
Sfty.View.App = React.createClass({

  mixins: [ReactBootstrap.OverlayMixin],

  getDefaultProps: function () {
    return {
      ready: false,
      modal: null,
      title: Sfty.Config.title,
    };
  },

  getInitialState: function () {
    return {
      data: null,
      comparison: null,
      constraints: {},
    };
  },

  gotoBuilderView: function () {
    this.setState({ data: null });
  },

  /**
   * Prefferably pass back with the key defined,
   * and the first parameter passed in.
   */
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
      var duplicate = constraints[key].some(function (a) {
        return options.__value.some(function (b) {
          return a === b;
        });
      });

      //
      // skips duplicates to prevent a crash.
      //
      if (duplicate) { return; }
      
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
    if (data.length) {
      this.setState({ data: data });
    }
    else {
      this.setState({ 
        modal: {
          title: "No dice!",
          body: "There were no incidents that matched your query!"
        }
      });
    }
  },

  closeModal: function () {
    this.setState({ modal: null });
  },
 
  /**
   * Query building view, this is only built once the
   * propety `ready` is true. getValue content is blank
   */
  renderQueryView: function () {
    var comparison = !!this.state.comparison ? this.state.comparison : null;

    return React.DOM.section({},
      React.DOM.section({ className: "row" },
        Sfty.View.QueryBuilder({
          className: "col-md-6 col-sm-6",
          comparison: this.state.comparison,
          updateComparison: this.updateField('comparison'),
          addConstraint: this.addConstraint,
        }),
        Sfty.View.QueryPreviewer({
          className: "col-md-6 col-sm-6",
          removeConstraint: this.removeConstraint,
          constraints: this.state.constraints,
        })
      ),
      Sfty.View.GoButton({
        constraints: this.state.constraints,
        comparison: this.state.comparison,
        endpoint: "/api/aggregate",
        callback: this.callback,
      })
    );
  },

  renderVisualisation: function () {
    return Sfty.View.Graphizer({
      category: this.state.comparison,
      goBack: this.gotoBuilderView,
      data: this.state.data,
      type: this.state.graph,
    });
  },

  /**
   * Builds main view
   */
  render: Sfty.Util.Debug.skip("render app", function () {
    var mainView =
      !!this.state.data ?

        // once data has been loaded from server
        this.renderVisualisation :

        // while forming query
        this.renderQueryView ;

    return (
      <section id="outer-app">
        <section id="app">
          <a href='/' className="no-text-decor">
            <h1>{this.props.title} <i className="glyphicon glyphicon-signal" /></h1>
          </a>
          {this.props.ready ? mainView() : null}
        </section>
      </section>
    );
  }),

  renderOverlay: function () {
    if (!this.state.modal) {
      return <span/>;
    }

    var Modal = ReactBootstrap.Modal;

    return (
      <Modal title={this.state.modal.title} onRequestHide={this.closeModal}>
        <div className="modal-body">
          {this.state.modal.body}
        </div>
      </Modal>
    );
  }

});

