/** 
 * @jsx React.DOM 
 */


Sfty.View.GroupButton = React.createClass({

  /**
   * PROPERTIES
   * 
   * onChange: A callback which the changes are passed
   * id: the id of the property
   * data: the option data
   * title: text in label
   * 
   */
  getDefaultProps: function () {
    return {
      onChange: function () {},
      id: Sfty.Util.Rand.uid(),
      data: [],
      title: 'Untitled'
    };
  },

  /**
   * STATE
   *
   * enabled: A set of values that are enabled, by
   *  default the set is empty.
   */
  getInitialState: function () {
    return { enabled: mori.set([]) };
  },

  /**
   * 
   */
  onClick: function (id) {
    var newState = 
      mori.has_key(this.state.enabled, id) ?
      mori.disj(this.state.enabled, id) :
      mori.conj(this.state.enabled, id) ;

    this.setState({ enabled: newState });
    this.props.onChange(mori.clj_to_js(newState));
  },


  render: function () {
    var ButtonGroup, Button, uid, style;

    ButtonGroup = ReactBootstrap.ButtonGroup;
    Button = ReactBootstrap.Button;

    style = {
      width: Math.floor(100 / this.props.data.length)+"%"
    };

    return (
      <section className="query-field">
        <label htmlFor={this.props.uid}>
          <b>{this.props.title}</b>
        </label>
        <ButtonGroup justified id={this.props.uid}>
          {this.props.data.map(function (field) {
            var active = mori.has_key(this.state.enabled, field.id);

            var config = {
              bsStyle: active ? 'primary' : 'default', 
              key: field.id, 
              style: style,
              onClick: this.onClick.bind(this, field.id)
            };

            return Button(config, field.name);
          }, this)}
        </ButtonGroup>
      </section>
    );
  }

});

