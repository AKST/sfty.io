
/**
 * Configuration data for the applicaption 
 * that doesn't change.
 */
Sfty.Config = (function () {

  /**
   * wrapper for config data
   */
  var Field = ClassExtender.extend({
    init: function (items) {
      this.items = items; 
    },
    /**
     * Checks if a field has a value
     */
    has: function (field) {
      return this.items
        .map(Sfty.Fn.access('id'))
        .indexOf(field) !== -1;   
    }
  });

  return {
    name: 'Sfty.io',

    graphs: [
      {
        id: 'bar',
        name: 'bar graph'
      }, {
        id: 'area',
        name: 'area graph'
      }, {
        id: 'pie',
        name: 'pie graph'
      }, {
        id: 'bell',
        name: 'bell curve'
      }
    ],

    aspects: [
      { 
        id: 'type',
        name: 'type of injury' 
      }, { 
        id: 'activity',
        name: 'activity during injury' 
      }, { 
        id: 'location',
        name: 'body location' 
      }, { 
        id: 'cause',
        name: 'cause of injury'
      }, { 
        id: 'fatal',
        name: 'was injury the injury fatal'
      }, {
        id: 'industry',
        name: 'industry of casualty'
      }, {
        id: 'occupation',
        name: 'occupation of casualty',
      }, {
        id: 'workload',
        name: 'workload of casualty',
      }, {
        id: 'sex',
        name: 'sex of casualty',
      }
    ],

    /**
     * returns a field object
     */
    field: function (field) {
      if (this[field]) {
        return new Field(this[field]);
      }
      else {
        throw TypeError(field + " is not part of config");
      }
    }
  };

})();

