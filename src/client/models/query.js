
Sfty.Constraint = (function () {
  
  var isValue = function (obj) {
    if (typeof obj.id !== 'string') { 
      return false; 
    }
    return true;
  };

  var isKey = function (key) {
    return typeof key === 'string'; 
  };
  
  return ClassExtender.extend({

    field: null,
    inclusive: null,
    values: {},

    init: function (field, inclusive) {
      this.field = field;
      this.inclusive = !!inclusive;
    },

    add: Sfty.Decrs.predicate(isValue, function (obj) {
      this.values[obj.id] = obj;
    }),

    remove: Sfty.Decrs.predicate(isKey, function (key) {
      delete this.values[key];
    }),

  });

})();

/**
 * Model Attributes
 *   - graph: the type of visualisation
 *   - topic: the focus of the query
 *   - constraints: 
 *      - field
 *      - inclusive
 *      - values
 */
Sfty.Query = (function () {

  // configuration object
  var conf = Sfty.Config; 
  

  return Backbone.Model.extend({

    /**
     * Checks validation for query
     */
    validate: function (attrs, options) {
      if (conf.field('graphs').has(attrs.graph)) {
         return "missing graph";
      } 
      if (conf.field('aspects').has(attrs.topic)) {
        return "missing graph";
      }
      var validConstraints = _.all(attrs.constraints, function (constraint) {
        return conf.field('aspects').has(constraint.field);
      });
      if (!validConstraints) {
        return "invaild constraints";
      }
    }

  });

})();

