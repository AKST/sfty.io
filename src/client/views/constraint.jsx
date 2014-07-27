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
        data: Sfty.Config.fields['comparison'].data,
        comparison: null,
      };
    },

    onChange: function (value) {
      this.props.update({
        tempValue: value,
        submittable: Boolean(value),
      });
    },

    render: function () {
      return Sfty.View.Select(_.defaults({
        onChange: this.onChange,
        data: this.props.data.filter(function (field) {
          return field.id !== this.props.comparison;                    
        }, this)
      }, this.props));
    } 

  });

  /**
   * Used to select value of constraint
   */
  SelectValue = React.createClass({

    getDefaultProps: function () { 
      return {
        update: function () {},
        catergory: null,
        fieldTypes: {
          select: Sfty.View.Select, 
          toggle: Sfty.View.GroupButton, 
          slide: React.DOM.div,
        }
      };
    },

    getCatergory: function () {
      return Sfty.Config.fields[this.props.catergory];
    },

    /**
     * Properates change up to ConstraintSelector
     */
    onChange: function (value) {
      var update;    

      switch (this.getCatergory().type) {
        case 'select': {
          update = { 
            tempValue: [Number(value)], 
            submittable: !!value.length 
          };
          this.props.update(update);
        } break;
        case 'toggle': {
          update = { 
            tempValue: value, 
            submittable: !!value.length 
          };
          this.props.update(update);
        } break;
        case 'slide': {

        } break;
      }
    },

    /**
     * Selecting a Component constructor from 
     * this.props.fieldTypes based on this components
     * this.props.catergory.type
     */
    render: function () {
      var catergory = this.getCatergory();
      return this.props.fieldTypes[catergory.type](_.defaults({
        onChange: this.onChange
      }, catergory));
    } 

  });
  

  /**
   * States
   *
   * - Select Catergory
   *   - select value in input, & save to tempValue
   *   - once button is pressed, save tempValue to catergory
   * - Select Value for catergory
   *   - select value in input, & save to tempValue
   *   - call pass tempValue & catergory to this.props.update
   * - repeat
   */
  return React.createClass({

    getDefaultProps: function () {
      return {
        update: function () {},
        comparison: null,
      };
    },

    /**
     * submittable: if the button is pressable 
     * catergory: the catergory of select
     * tempValue: the value between states
     */
    getInitialState: function () {
      return {
        catergory: null,
        submittable: false,
        tempValue: null,
      };
    },

    update: function (options) {
      console.log(options);
      this.setState(options);
    }, 

    onClick: function () {
      if (!!this.state.catergory) {
        this.props.update({ 
          catergory: this.state.catergory, 
          value: this.state.tempValue 
        });
        this.setState({
          catergory: null,
          submittable: false,
          tempValue: null,
        });
      }
      else {
        this.setState({
          catergory: this.state.tempValue, 
          submittable: false 
        });
      }
    },
  
    render: function () {
      return React.DOM.section({ className: 'row' }, [

        // 9/12 input
        React.DOM.section({ className: 'col-md-9 col-sm-9 col-xs-9' }, [
          (!!this.state.catergory ? SelectValue : SelectCatergory)({
            update: this.update, 
            catergory: this.state.catergory,
            comparison: this.props.comparison,
          })
        ]),

        // 3/12 button 
        React.DOM.section({ className: 'col-md-3 col-sm-3 col-xs-3' }, [
          ReactBootstrap.Button({
            bsStyle: 'primary',
            className: 't-bump full-width', 
            onClick: this.onClick,
            disabled: !this.state.submittable
          }, this.state.catergory === null ? "Select" : "Add")
        ]),

      ]);
    }
  
  });

})();

