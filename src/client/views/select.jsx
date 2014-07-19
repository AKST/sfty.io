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
 * + data: (list of options)
 *   - option.id
 *   - option.name
 */
Sfty.View.Select =  React.createClass({
  
  placeholder: function () {
    var firstLetter, isVowel, vowels, determiner; 

    firstLetter = this.props.title[0];
    vowels = ['a', 'i', 'u', 'e', 'o'];
    isVowel = _.contains(vowels, firstLetter);
    determiner = isVowel ? 'an' : 'a';

    return 'Select '+determiner+' '+this.props.title;
  },

  render: function () {
    var id, Input;
    
    id = Sfty.Util.Rand.uid('dropdown');
    Input = ReactBootstrap.Input;

    return (
      <section className="query-field"> 
        <label htmlFor={id}>
          <b>{this.props.title}</b>
        </label>
        <Input type="select" id={id}>
          <option>{this.placeholder()}</option>
          {this.props.data.map(function (item) {
            return (
              <option value={item.id} key={item.id}>
                {Sfty.Str.captialize(item.name)}
              </option>
            );
          })}
        </Input>
      </section>
    );
  }
});

/**
 * Properties 
 * - url
 * - title
 */
Sfty.View.AJaxSelect = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },

  /**
   * Updates state
   */
  fetchSuccess: function (data) {
    this.setState({ data: _.sortBy(data, function (obj) {
      return obj.name.charCodeAt(0);  
    })});
  },

  componentDidMount: function () {
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
    return Sfty.View.Select({
          title: this.props.title,
          data: this.state.data
    });
  }
});
