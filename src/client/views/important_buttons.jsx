/**
 * @jsx React.DOM 
 */

Sfty.View.GoButton = React.createClass({

  mixins: [ReactBootstrap.OverlayMixin],
  
  getDefaultProps: function () {
    return {
      constraints: {},
      endpoint: '/',
      callback: function () {},
      comparison: null,
      onFailure: console.error.bind(console)
    };
  },

  getInitialState: function () {
    return {
      loading: false
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

    if (this.props.constraints[this.props.comparison]) {
      this.setState({ modal: {
        title: "Invalid Search",
        body: "You can't compare by a metric " +
          "in which you're using as a constraint",
      }});
      return;
    }

    setTimeout(function () {
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

        var mArray = _.sortBy(Sfty.Util.Arrays.fromObject(mObject, "_id", "total"), function (row) {
          return -row.total;                                                                        
        });
        var fArray = _.sortBy(Sfty.Util.Arrays.fromObject(fObject, "_id", "total"), function (row) {
          return -row.total;                                                                        
        });

        this.props.callback({
          main: responses[0],
          male: mArray,
          female: fArray,
        });
      }.bind(this), this.props.onFailure);
    }.bind(this), 0);

    this.setState({ loading: true });
  },

  render: function () {
    var iconClass = this.state.loading ? "loading glyphicon-cog"  : "glyphicon-signal";
    var text      = this.state.loading ? "Loading" : "Run Query";

    return (
      <a className="lanuch-query space-below" onClick={this.onClick}>
        <span className="hidden-xs">
          {text} <i className={"glyphicon " + iconClass} />
        </span>
        <span className="visible-xs">
          <span className={"glyphicon " + iconClass}></span>
        </span>
      </a>
    );
  },


  renderOverlay: function () {
    if (!this.state.modal) {
      return <span/>;
    }

    var Modal = ReactBootstrap.Modal;
  
    var closeModal = function () {
      this.setState({ modal: null });
    }.bind(this);

    return (
      <Modal title={this.state.modal.title} onRequestHide={closeModal}>
        <div className="modal-body">
          {this.state.modal.body}
        </div>
      </Modal>
    );
  }

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
