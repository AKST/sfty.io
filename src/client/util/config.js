
/**
 * Configuration data for the applicaption 
 * that doesn't change.
 */
Sfty.Util.Config = (function () {

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
        .map(Sfty.Util.Fn.access('id'))
        .indexOf(field) !== -1;   
    }
  });

  return {
    name: 'Sfty.io',

    ageSlider: {
      range: {
        min: 15, 
        max: 75
      },
      step: 10,
      margin: 10,
      connect: true,
    },

    /**
     * Gender
     */
    gender: [
      { id: 'M', name: 'Male' },
      { id: 'F', name: 'Female' }
    ],

    /**
     * Workload
     */
    workloads: [
      { id: 'full-time', name: 'Full time' },
      { id: 'part-time', name: 'Part time' },
    ],

    fatalities: [
      { id: true, name: 'Fatal' },
      { id: false, name: 'Non-fatal' },
    ],

    /**
     * The different types of graphs
     */
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

    /**
     * The different types of data available for
     * the incident data
     */
    aspects: [
      { 
        id: 'injury',
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

