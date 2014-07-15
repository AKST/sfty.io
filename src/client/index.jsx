/** 
 * @jsx React.DOM 
 */

Sfty.MultiButton = React.createClass({

  render: function () {
    var options = this.props.data.map(function (data) {
      return (
        <li><a data-id={data.id}>{data.name}</a></li>
      );
    });

    return (
      <div class="multiselect">
        <button type="button" data-toggle="dropdown"> 
          Action <span class="caret"></span>
        </button>
        <ul role="menu">
          {options}
        </ul>
      </div>
    );
  }
});

Sfty.App = React.createClass({
  render: function () {
    var Btn = Sfty.MultiButton;
    return (
      <div id="app">
        <h1>{this.props.data.name}</h1>
        <Btn data={this.props.data.graphs} />
        <Btn data={this.props.data.aspects} />
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

