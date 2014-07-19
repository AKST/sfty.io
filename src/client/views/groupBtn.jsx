/** 
 * @jsx React.DOM 
 */


Sfty.View.GroupButton = React.createClass({

  getInitialState: function () {
    return { disabled: mori.set([]) };
  },

  onClick: function (id) {
    var newState = 
      mori.has_key(this.state.disabled, id) ?
      mori.disj(this.state.disabled, id) :
      mori.conj(this.state.disabled, id) ;

    this.setState({ disabled: newState });
  },

  render: function () {
    var ButtonGroup, Button, uid, style;

    ButtonGroup = ReactBootstrap.ButtonGroup;
    Button = ReactBootstrap.Button;
    uid = Sfty.Util.Rand.uid();

    style = {
      width: Math.floor(100 / this.props.data.length)+"%"
    };

    return (
      <section className="query-field">
        <label htmlFor={uid}>
          <b>{this.props.title}</b>
        </label>
        <ButtonGroup justified id={uid}>
          {this.props.data.map(function (field) {
            var active = !mori.has_key(this.state.disabled, field.id);

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

