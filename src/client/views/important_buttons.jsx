/**
 * @jsx React.DOM 
 */

Sfty.View.GoButton = React.createClass({
  
  getDefaultProps: function () {
    return {
      constraints: {},
      endpoint: '/',
      callback: function () {},
      comparison: null,
      onFailure: console.error.bind(console)
    };
  },

  /**
   * url is a computed property.
   *
   * Is basically the endpoint property with the 
   * data transformed into query arguments.
   *
   * with 
   *  - endpoint '/data'
   *  - data { a: [1,2,3], b: "hello" }
   *
   * you get
   *  - '/data?a=1,2,3&b=hello'
   *
   */
  getUrl: function () {
    return Sfty.Util.Str.generateUrlParams({
      endpoint: this.props.endpoint, 
      params: _.extend({
        comparison: this.props.comparison 
      }, this.props.constraints),
    });
  },

  /**
   * Event when clicked.
   */
  onClick: function () {
    
    // build a es6 promise from an jquery
    // deffered ajax request

    if (!this.props.comparison) { return; }

    var promise = Promise.resolve($.ajax({
      url: this.getUrl(),
      dataType: 'json',
      type: 'GET',
    }));

    promise.then(
      // on request success
      this.props.callback, 
      // on request failure
      this.props.onFailure
    );
  },

  render: function () {
    return (
      <a className="lanuch-query space-below" onClick={this.onClick}>
        <span className="hidden-xs">
          Run Query <i className="glyphicon glyphicon-signal" />
        </span>
        <span className="visible-xs">
          <span className="glyphicon glyphicon-signal"></span>
        </span>
      </a>
    );
  },

});


Sfty.View.GoBackButton = React.createClass({

  propTypes: {
    goBack: React.PropTypes.func,
  },

  render: function () {
    return (
      <a className="lanuch-query space-below" onClick={this.props.goBack}>
        <span className="hidden-xs">
          Revise Query
        </span>
        <span className="visible-xs">
          <span className="glyphicon glyphicon-step-backward"></span>
        </span>
      </a>
    );
  }

});