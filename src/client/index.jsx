/** 
 * @jsx React.DOM 
 */

Sfty.App = React.createClass({
  render: function () {
    return (
      <div id="app">
        <h1>{this.props.name}</h1>
      </div>
    );
  }
});


$('body').ready(function () {
  var body = $('body')[0],
      App  = Sfty.App;

  React.renderComponent(App(Sfty.Config), body);
});

