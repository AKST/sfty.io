/**
 * @jsx React.DOM
 */

/**
 * Generates a preview for query
 */
Sfty.View.QueryPreviewer = React.createClass({

  propTypes: {
    removeConstraint: React.PropTypes.func,
    constraints: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      removeConstraint: null,
      constraints: {},
      comparison: null,
      className: '',
      graph: null,
    };
  },

  /**
   * builds callback for
   */
  __callbackFor: function (category, id) {
    var callback;
    callback = this.props.removeConstraint;
    callback = callback.bind(null, category, id);
    return callback;
  },

  //
  // Generates a data structure like so, built off
  // the components properties.
  //
  __generatePayload: function () {
    return _.pairs(this.props.constraints).map(function (pair) {
      var categoryName = pair[0];
      var elements = pair[1].map(function (id) {
        return {
          text: Sfty.Config.lookupId({
            category: categoryName,
            property: "name",
            id: id
          }),
          callback: this.__callbackFor(categoryName, id)
        };
      }, this);

      return {
        elements: elements,
        constraintT: Sfty.Config.fields[categoryName].title,
        constraintK: categoryName+"_contraints",
      };
    }, this);
  },

  //
  // Constraint Category Items
  //
  renderCategories: function (elems) {
    var outerKey = elems.constraintK;

    return React.DOM.li({ className: "preview-category", key: outerKey },
      Sfty.View.header(elems.constraintT, 4),
      React.DOM.ul({ className: "pv-category-constraints" },
        elems.elements.map(this.renderConstraint.bind(this, outerKey))
      )
    );
  },


  //
  // Constraint Item
  //
  renderConstraint: function (outerKey, constraint) {
    var iconClass = "glyphicon glyphicon-remove remove-constraint-button";
    var innerKey = outerKey + "_" + constraint.text.replace(' ', '_');

    var icon = React.DOM.span({
      className: iconClass,
      onClick: constraint.callback
    });

    return React.DOM.li({ className: "pv-constraint", key: innerKey },
      icon,
      constraint.text
    );
  },

  render: function () {
    var data = this.__generatePayload();
    var categories = data.map(this.renderCategories);

    return React.DOM.section({ id: "pv-query", className: this.props.className },
      Sfty.View.Type.UnderlinedHeader({ size: 3, text: "Search By" }),
      React.DOM.ul({ className: "pv-categories" }, categories)
    );
  },


});
