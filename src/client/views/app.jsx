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
    var Footer, Header; 
    
    Footer = Sfty.View.Footer;
    Header = Sfty.View.Type.UnderlinedHeader;

    return (
      <section id="outer-app">
        <section id="app">
          <h1>{this.props.title}</h1>

          {this.props.groups.map(function (group, index) {
            group = _.defaults(group, { key: index });
            return Sfty.View.InputGroup(group); 
          }, this)}

          <a className="lanuch-query">
            Run Query
          </a>
        </section>
        <Footer />
      </section>
    );
  }

});

