
/**
 * Configuration data for the application that doesn't change.
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
        type: 'select',
        data: [
          { id: 'injury', name: 'type of injury' }, 
          { id: 'activity', name: 'activity during injury' }, 
          { id: 'location', name: 'body location' }, 
          { id: 'cause', name: 'cause of injury' }, 
          { id: 'fatality', name: 'was injury the injury fatal' }, 
          { id: 'industry', name: 'industry of casualty' }, 
          { id: 'occupation', name: 'occupation of casualty' }, 
          { id: 'workload', name: 'workload of casualty' }, 
          { id: 'gender', name: 'sex of casualty' },
        ],
      },
      graph: {
        group: 'visualisation',
        title: 'Visualisation Type',
        type: 'select',
        data: [
          { id: 'pie', name: 'donut chart' },
          { id: 'bar', name: 'bar graph' }, 
          { id: 'area', name: 'area graph' },
          { id: 'bell', name: 'bell curve' },
        ],
      },

      fatality: {
        group: 'injury',
        title: 'Was the injury fatal',
        type: 'toggle',
        data: [
          { id: true, name: 'Yes' },
          { id: false, name: 'No' },
        ]
      },
      injury: {
        group: 'injury',
        url: '/rest/injuries',
        title: 'injury type',
        type: 'select',
        loaded: false,
        data: [],
      },
      cause: {
        group: 'injury',
        url: '/rest/causes',
        title: 'Cause of Injury',
        type: 'select',
        loaded: false,
        data: [],
      },
      location: {
        group: 'injury',
        url: '/rest/locations',
        title: 'Body Location of Injury',
        type: 'select',
        loaded: false,
        data: [],
      },
      activity: {
        group: 'injury',
        url: '/rest/activities',
        title: 'Activity taking place',
        type: 'select',
        loaded: false,
        data: [],
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
        title: 'industry of casualty',
        type: 'select',
        loaded: false,
        data: [],
      },
      occupation: {
        group: 'profile',
        url: '/rest/occupations',
        title: 'occupation',
        type: 'select',
        loaded: false,
        data: [],
      },
    },


    fields: null,
    fieldList: null,

    /**
     * Does stuff like async config loading
     */
    init: function () {
      return new Promise(function (fulfil, reject) {
        var count, fields, fieldNames, totalFields;

        fields = {};
        count  = 0;
        fieldNames = _.keys(this.__fields);
        totalFields = fieldNames.length;

        fieldNames.forEach(function (fieldName) {
          this.__getField(fieldName).then(function (field) {
            fields[fieldName] = field;
            count++;

            // on last field update
            if (count >= totalFields) {
              this.fields = fields;
              this.fieldList = _.values(fields);
              fulfil(this);
            }
          }.bind(this), reject);
        }.bind(this));
      }.bind(this));
    },


    /**
     * Generates promise for field
     */
    __getField: function (fieldName) {
      var field;

      if (fieldName in this.__fields) {
        field = new Field(this.__fields[fieldName]);
      }
      else {
        throw TypeError(fieldName + " is not part of config");
      }
      
      if (field.loaded !== undefined && field.loaded === false) {
        return new Promise(function (fulfil, reject) {
          var deferred = $.ajax({
            url: field.url
          });
          deferred.done(function (data) {
            field.data = data;
            fulfil(field);
          });
          deferred.fail(reject);
        });
      }
      else {
        return Promise.resolve(field);
      }
    },


    /**
     * Does an id lookup an object
     */
    lookupId: function (config) {
      var name, id, prop;

      id = config.id;
      prop = config.property;
      name = config.category;

      return _.find(this.fields[name].data, function (e) {
        return e.id === id;
      })[prop];  
    },


  };

  return config;
})();

