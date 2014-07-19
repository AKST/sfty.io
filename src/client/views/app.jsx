/** 
 * @jsx React.DOM 
 */


Sfty.View.App = React.createClass({

  getDefaultProps: function () {
    return {
      title: 'Your App',
      groups: [],
    };
  },

  getInitialState: function () {
    return { 
      meta: {},
      orConds: [],
      andConds: [],
    };
  },


  render: function () {
    var Footer = Sfty.View.Footer;
    return (  
      <div id="outer-app">
        <div id="app">
          <h1>{this.props.title}</h1>
          {this.props.groups.map(function (group, index) {
            group = _.defaults(group, { key: index });
            return Sfty.View.InputGroup(group); 
          }, this)}
        </div>
        <Footer />
      </div>
    );
  }

});

