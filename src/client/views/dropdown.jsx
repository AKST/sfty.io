/** 
 * @jsx React.DOM 
 */

Sfty.MultiButton = React.createClass({

  mainClass: "btn-group",
  btnClass: "btn btn-default drop-down-toggle",
  listClass: "dropdown-menu",

  render: function () {
    var options = this.props.data.map(function (data) {
      return (
        <li key={data.id}><a href="#">{data.name}</a></li>
      );
    });

    return (
      <div className={this.mainClass}>
        <button type="button" data-toggle="dropdown" className={this.btnClass}> 
          {this.props.title} 
          <span className="caret"></span>
        </button>
        <ul role="menu" className={this.listClass}>
          {options}
        </ul>
      </div>
    );
  }
});

