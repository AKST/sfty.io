/** 
 * @jsx React.DOM 
 */

Sfty.App = React.createClass({
  render: function () {
    var DropDown = Sfty.DropDown;
    return (
      <div id="app">
        <h1>{this.props.data.name}</h1>
        <DropDown title="Graphs" options={this.props.data.graphs} />
        <DropDown title="Comparison" options={this.props.data.aspects} />
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

