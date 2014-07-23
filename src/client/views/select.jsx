/** 
 * @jsx React.DOM 
 */

/**
 * Needs a reload funciton implemented
 */
Sfty.View.Mixin.Selectize = {

  __selectize_object: function () {
    return $('#'+this.props.id);
  },

  __getOptions: function () {
    return this.selectizeOptions ?
      this.selectizeOptions() : {} ;
  },

  selectize: function () {
    var obj = this.__selectize_object();
    obj.selectize(this.__getOptions());
  },

};

Sfty.View.SimpleSelect =  React.createClass({

  getDefaultProps: function () {
    return {
      onChange: function () {},
    };
  },

  render: function () {
    var Input;

    Input = ReactBootstrap.Input;

    return (
      <section className="query-field"> 
        <label htmlFor={this.props.id}>
          <b>{this.props.title}</b>
        </label>
        <select id={this.props.id}>
          <option></option>
          {this.props.data.map(function (item, index) {
            return (
              <option value={item.id} key={index}>
                {Sfty.Util.Str.captialize(item.name)}
              </option>
            );
          })}
        </select>
      </section>
    );
  }

});



Sfty.View.Select =  React.createClass({

  mixins: [Sfty.View.Mixin.Selectize],

  selectizeOptions: function () {
    return { onChange: this.props.onChange };
  },

  getDefaultProps: function () {
    return {
      id: Sfty.Util.Rand.uid('dropdown'),
      title: 'Untitled',
      data: []
    };
  },

  componentDidMount: function () {
    this.selectize();
  },

  render: function () {
    return Sfty.View.SimpleSelect(this.props);
  }

});


Sfty.View.AJaxSelect = React.createClass({

  mixins: [Sfty.View.Mixin.Selectize],

  getDefaultProps: function () {
    return {
      id: Sfty.Util.Rand.uid('dropdown'),
      title: 'Untitled',
    };
  },

  getInitialState: function () {
    return { data: [] };
  },

  /**
   * Updates state
   */
  fetchSuccess: function (data) {
    var sorted = _.sortBy(data, function (obj) {
      return obj.name.charCodeAt(0);  
    });
    this.setState({ data: sorted });
    this.selectize();
  },

  componentDidMount: function () {
    $('#'+this.props.id).hide();
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: this.fetchSuccess,
      error: function (_, code, err) {
        console.err(code, err);
      }
    });
  },

  render: function () {
    return Sfty.View.SimpleSelect({
      id: this.props.id,
      title: this.props.title,
      data: this.state.data
    });
  }
  
});
