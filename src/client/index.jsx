/** 
 * @jsx React.DOM 
 */

Sfty.App = React.createClass({
  render: function () {
    var Btn = Sfty.MultiButton;
    return (
      <div id="app">
        <h1>{this.props.data.name}</h1>
        <Btn title="Graphs" data={this.props.data.graphs} />
        <br />
        <Btn title="Comparison" data={this.props.data.aspects} />
        <br />
      </div>
    );
  }
});


$('body').ready(function () {
  var body = $('body')[0],
      App  = Sfty.App;

  React.renderComponent(
    <App data={Sfty.Config}/>, 
    body
  );
});

