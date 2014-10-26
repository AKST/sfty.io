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
  getUrl: function (custom) { 
    return Sfty.Util.Str.generateUrlParams({
      endpoint: this.props.endpoint, 
      params: _.extend({ 
        comparison: this.props.comparison,
      }, this.props.constraints, custom || undefined),
    });
  },

  getMale: function () {
    return this.getUrl({
      comparison: this.props.comparison, 
      gender: ['M'] 
    }, this.props.constraints);
  },

  getFemale: function () {
    return this.getUrl({
      comparison: this.props.comparison, 
      gender: ['F'] 
    }, this.props.constraints);
  },

  /**
   * Event when clicked.
   */
  onClick: function () {
    
    // build a es6 promise from an jquery
    // deffered ajax request

    if (!this.props.comparison) { return; }

    var urls = [this.getUrl()];

    if (!('gender' in this.props.constraints)) {
      urls.push(this.getMale());
      urls.push(this.getFemale());
    }

    urls = urls.map(function requestUrl (url) {
      return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
      });
    });

    Promise.all(urls).then(function (responses) {
      var a;
      var mObject = Sfty.Util.Arrays.toObject(responses[1], "_id", "total");
      var fObject = Sfty.Util.Arrays.toObject(responses[2], "_id", "total");

      for (a in mObject) { 
        if (!(a in fObject)) { fObject[a] = 0; }
      }

      for (a in fObject) { 
        if (!(a in mObject)) { mObject[a] = 0; }
      }

      console.log(mObject, fObject);

      var mArray = _.sortBy(Sfty.Util.Arrays.fromObject(mObject, "_id", "total"), function (row) {
        return -row.total;                                                                        
      });
      var fArray = _.sortBy(Sfty.Util.Arrays.fromObject(fObject, "_id", "total"), function (row) {
        return -row.total;                                                                        
      });

      console.log(mArray, fArray);

      this.props.callback({
        main: responses[0],
        male: mArray,
        female: fArray,
      });
    }.bind(this), this.props.onFailure);
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
