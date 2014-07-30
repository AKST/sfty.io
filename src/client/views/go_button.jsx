/**
 * @jsx React.DOM 
 */

Sfty.View.GoButton = React.createClass({
  
  getDefaultProps: function () {
    return {
      data: {},
      endpoint: '/',
      callback: function () {},
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
      params: this.props.data,
    });
  },

  /**
   * Event when clicked.
   */
  onClick: function () {
    
    // build a es6 promise from an jquery
    // deffered ajax request

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
      <a className="lanuch-query" onClick={this.onClick}>
        Run Query <i className="glyphicon glyphicon-signal" />
      </a>
    );
  },

});