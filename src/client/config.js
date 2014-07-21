
/**
 * Configuration data for the applicaption 
 * that doesn't change.
 */
Sfty.Config = (function () {
  var Field, config;

  /**
   * wrapper for config data
   */
  Field = ClassExtender.extend({
    init: function (config) {
      for (var key in config) {
        this[key] = config[key];
      }
    },

    /**
     * Checks if a field has a value
     */
    has: function (field) {
      return this.data
        .map(Sfty.Util.Fn.access('id'))
        .indexOf(field) !== -1;   
    }
  });

  config = {
    title: 'Sfty.io',

    fieldGroups: {
      visualisation: {
        id: 'visualisation',
        title: 'Type of Visualisation'
      },
      injury: {
        id: 'injury',
        title: 'Nature of Injury'
      },
      profile: {
        id: 'profile', 
        title: 'Causality Profile'
      },
    },

    groupOrder: ['visualisation', 'injury', 'profile'], 

    __fields: {
      comparison: {
        group: 'visualisation',
        title: 'Comparison Subject',
        type: 'staticSelect',
        data: [
          { id: 'injury', name: 'type of injury' }, 
          { id: 'activity', name: 'activity during injury' }, 
          { id: 'location', name: 'body location' }, 
          { id: 'cause', name: 'cause of injury' }, 
          { id: 'fatal', name: 'was injury the injury fatal' }, 
          { id: 'industry', name: 'industry of casualty' }, 
          { id: 'occupation', name: 'occupation of casualty' }, 
          { id: 'workload', name: 'workload of casualty' }, 
          { id: 'sex', name: 'sex of casualty' },
        ],
      },
      graph: {
        group: 'visualisation',
        title: 'Visualisation Type',
        type: 'staticSelect',
        data: [
          { id: 'pie', name: 'donut chart' },
          { id: 'bar', name: 'bar graph' }, 
          { id: 'area', name: 'area graph' },
          { id: 'bell', name: 'bell curve' },
        ],
      },

      fatality: {
        group: 'injury',
        title: 'Was the injury ...',
        type: 'toggle',
        data: [
          { id: true, name: 'Fatal' },
          { id: false, name: 'Non-fatal' },
        ]
      },
      injury: {
        group: 'injury',
        url: '/rest/injuries',
        title: 'injury type',
        type: 'ajaxSelect',
      },
      cause: {
        group: 'injury',
        url: '/rest/causes',
        title: 'Cause of Injury',
        type: 'ajaxSelect',
      },
      location: {
        group: 'injury',
        url: '/rest/locations',
        title: 'Body Location of Injury',
        type: 'ajaxSelect',
      },
      activity: {
        group: 'injury',
        url: '/rest/activities',
        title: 'Activity taking place',
        type: 'ajaxSelect',
      },
      
      
      workload: {
        group: 'profile',
        title: 'workload',
        type: 'toggle',
        data: [
          { id: 'full-time', name: 'Full time' },
          { id: 'part-time', name: 'Part time' },
        ],
      },
      gender: {
        group: 'profile',
        title: 'gender',
        type: 'toggle',
        data: [
          { id: 'M', name: 'Male' },
          { id: 'F', name: 'Female' }
        ],
      },
      age: {
        group: 'profile',
        title: 'age',
        type: 'slide',
        config: {
          range: { min: 15, max: 75 },
          step: 10,
          margin: 10,
          connect: true,
        },
      },
      industry: {
        group: 'profile',
        url: '/rest/industries',
        title: 'body location of injury',
        type: 'ajaxSelect',
      },
      occupation: {
        group: 'profile',
        url: '/rest/occupations',
        title: 'occupation',
        type: 'ajaxSelect',
      }
    },

    /**
     * returns a field object
     */
    field: function (field) {
      if (field in this.__fields) {
        return new Field(this.__fields[field]);
      }
      else {
        throw TypeError(field + " is not part of config");
      }
    }
  };

  config.fields = (function () {
    var obj = {};
    _.keys(this.__fields).forEach(function (key) {
      obj[key] = this.field(key);
    }, this);
    return obj;
  }).call(config);

  config.fieldList = _.values(config.fields);

  return config;
})();

