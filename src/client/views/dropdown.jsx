/** 
 * @jsx React.DOM 
 */

/**
 * Creates a input[type=select] tag with
 * all the data in this.props.options as
 * choices.
 *
 * Properties
 * + title: (text of button)
 * + style: (buttons style)
 * + options: (list of options)
 *   - option.id
 *   - option.name
 */
Sfty.View.DropDown = React.createClass({

  render: function () {
    var id = Sfty.Util.Rand.uid('dropdown');

    return React.DOM.div(null, 
      // label for input
      <label htmlFor={id}>
        <b>{this.props.title}</b>
      </label>,

      ReactBootstrap.Input({ type: "select", id: id },
        // default option
        <option>
          Please pick a {this.props.title}.
        </option>,

        // adds all the options to the input select
        this.props.data.map(function (option) {
          var name = Sfty.Str.captialize(option.name);
          return <option value={option.id} key={option.id}>{name}</option>;
        })
      )
    );
  }

});

