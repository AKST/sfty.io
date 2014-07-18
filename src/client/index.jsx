/** 
 * @jsx React.DOM 
 */

Sfty.App = React.createClass({

  // type of graph
  graphTypes: function () { 
    return this.props.data.graphs; 
  },

  // type of comparison
  comparisonTypes: function () { 
    return this.props.data.aspects; 
  },

  render: function () {
    var DropDown = Sfty.DropDown;
    return React.DOM.div({ id: "app"},  
      <h1>{this.props.data.name}</h1>,

      React.DOM.form(null,
        Sfty.View.Type.UnderlinedHeader({ title: "Type of Visualisation", size: 2 }),

        Sfty.View.DropDown({ title: "graph", data: this.graphTypes() }),
        Sfty.View.DropDown({ title: "comparison", data: this.comparisonTypes() }),

        Sfty.View.Type.UnderlinedHeader({ title: "Constraints", size: 2 })
      )
    );
  }

});


$('body').ready(function () {
  var body = $('body')[0],
      App  = Sfty.App;

  React.renderComponent(
    <App data={Sfty.Util.Config}/>, 
    body
  );
});

