
/**
 * Configuration data for the applicaption 
 * that doesn't change.
 */
Sfty.Config = (function () {

  /**
   * wrapper for config data
   */
  var Field = ClassExtender.extend({
    init: function (config) {
      this.data = config.data; 
      for (var key in config.meta) {
        this[key] = config.meta[key];
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

  return {
    title: 'Sfty.io',

    fieldGroups: {
      visualisation: {
        id: 'visualisation',
        title: 'Type of Visualisation'
      },
      incident: {
        id: 'incident',
        title: 'Nature of Incidient'
      },
      profile: {
        id: 'profile', 
        title: 'Causality Profile'
      },
    },

    groupOrder: ['visualisation', 'incident', 'profile'], 

    __fields: {
      fields: [
        'age', 
        'gender', 
        'workload', 
        'fatality', 
        'graph', 
        'comparison',
        'injury', 
        'cause', 
        'activity', 
        'location', 
        'occupation', 
        'industry'
      ],
      data: {
        age: {
          range: { min: 15, max: 75 },
          step: 10,
          margin: 10,
          connect: true,
        },
        gender: [
          { id: 'M', name: 'Male' },
          { id: 'F', name: 'Female' }
        ],
        workload: [
          { id: 'full-time', name: 'Full time' },
          { id: 'part-time', name: 'Part time' },
        ],
        fatality: [
          { id: true, name: 'Fatal' },
          { id: false, name: 'Non-fatal' },
        ],
        graph: [
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
        comparison: [
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
      metadata: {
        graph: {
          group: 'visualisation',
          title: 'graph',
          type: 'staticSelect',
        },
        comparison: {
          group: 'visualisation',
          title: 'comparison',
          type: 'staticSelect',
        },

        fatality: {
          group: 'incident',
          title: 'fatal?',
          type: 'toggle',
        },
        injury: {
          group: 'incident',
          url: '/rest/injuries',
          title: 'injury type',
          type: 'ajaxSelect',
        },
        cause: {
          group: 'incident',
          url: '/rest/causes',
          title: 'cause',
          type: 'ajaxSelect',
        },
        location: {
          group: 'incident',
          url: '/rest/locations',
          title: 'body location of injury',
          type: 'ajaxSelect',
        },
        activity: {
          group: 'incident',
          url: '/rest/activities',
          title: 'activity before hand',
          type: 'ajaxSelect',
        },
        
        
        workload: {
          group: 'profile',
          title: 'workload',
          type: 'toggle',
        },
        gender: {
          group: 'profile',
          title: 'gender',
          type: 'toggle',
        },
        age: {
          group: 'profile',
          title: 'age',
          type: 'slide',
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
        },
      }
    },

    fieldList: function () {
      return this.__fields.fields.map(function (key) {
        return this.field(key);
      }, this);
    },

    fields: function () {
      var obj = {};
      this.__fields.fields.forEach(function (key) {
        obj[key] = this.field(key);
      }, this);
      return obj;
    },

    /**
     * returns a field object
     */
    field: function (field) {
      if (_.contains(this.__fields.fields, field)) {
        return new Field({
          data: this.__fields.data[field],
          meta: this.__fields.metadata[field]
        });
      }
      else {
        throw TypeError(field + " is not part of config");
      }
    }
  };

})();

