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
      queryData: {
        graph: null,
        comparison: null,
        constraints: {},
      },
    };
  },

  update: function (field) {
    return function (value) {
      console.log(value);
      var update = {};
      update[field] = value;
      this.setState(update);
    }.bind(this);
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
     * propety `ready` is true. otherwise content is blank
     */
    var onReady = function () {
      var Previewer, Builder, GoButton; 

      Builder = Sfty.View.QueryBuilder;
      Previewer = Sfty.View.QueryPreviewer;
      GoButton = Sfty.View.GoButton;

      return (
        <section>

          <section className="row">
            <Builder className="col-md-6 col-sm-6" onChange={this.update('queryData')}/>
            {Previewer(_.extend({ 
              className: "col-md-6 col-sm-6"
            }, this.state.queryData))}
          </section>

          <GoButton 
              data={this.state.queryData.constraints} 
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

