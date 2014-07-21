/** 
 * @jsx React.DOM 
 */

/**
 * Adds contraint
 */
Sfty.View.ConstraintSelector = (function () {

  var SelectCatergory, SelectValue;
  
  /**
   * Used to select type of constraint
   */
  SelectCatergory = React.createClass({
    getDefaultProps: function () {
      return {
        title: "Add Constraint Type (Optional)",
        data: Sfty.Config.field('comparison').data,
      };
    },

    render: function () {
      return Sfty.View.Select(this.props);
    } 
  });

  /**
   * Used to select value of constraint
   */
  SelectValue = React.createClass({
    render: function () {
      return <div />;
    } 
  });
  

  return React.createClass({

    getInitialState: function () {
      return {
        category: null
      };
    },
  
    render: function () {
      if (this.state.category === null) {
        return <SelectCatergory />;
      }
      else {
        return <SelectValue catergory={this.state.catergory} />;
      }
    }
  
  });

})();
