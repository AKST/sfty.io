/** 
 * @jsx React.DOM 
 */

/**
 * Properties
 * + title: (text of button)
 * + style: (buttons style)
 * + options: (list of options)
 *   - option.id
 *   - option.name
 */
Sfty.DropDown = React.createClass({

  style: function () {
    return this.props.style || 'default';
  },

  render: function () {
    var DropdownButton = ReactBootstrap.DropdownButton,
        MenuItem = ReactBootstrap.MenuItem;
    return (
      <DropdownButton title={this.props.title} bsStyle={this.style()}>
        {this.props.options.map(function (option) {
          return <MenuItem key={option.id}>{option.name}</MenuItem>; 
        })}
      </DropdownButton>
    );
  }
});

