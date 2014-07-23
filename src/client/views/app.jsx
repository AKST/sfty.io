/** 
 * @jsx React.DOM 
 */


/**
 * Main View
 */
Sfty.View.App = React.createClass({

  getDefaultProps: function () {
    return {
      title: 'Your App',
    };
  },

  getInitialState: function () {
    return { 
      queryData: {
        graph: null,
        comparison: null,
        constraint: {},
      },
    };
  },

  update: function (field) {
    return function (value) {
      var update = {};
      update[field] = value;
      this.setState(update);
    }.bind(this);
  },

  /**
   * Builds main view
   */
  render: function () {
    var Previewer, Builder; 

    Builder = Sfty.View.QueryBuilder;
    Previewer = Sfty.View.QueryPreviewer;

    return (
      <section id="outer-app">
        <section id="app">
          <h1>{this.props.title} <i className="glyphicon glyphicon-signal" /></h1>

          <section className="row">
            <Builder className="col-md-6 col-sm-6" onChange={this.update('queryData')}/>
            {Previewer(_.extend({ className: "col-md-6 col-sm-6" }, this.state.queryData))}
          </section>

          <a className="lanuch-query">
            Run Query <i className="glyphicon glyphicon-signal" />
          </a>
        </section>
      </section>
    );
  }

});

