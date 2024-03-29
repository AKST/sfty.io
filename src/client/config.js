
/**
 * Configuration data for the application that doesn't change.
 */
Sfty.Config = (function () {

  /**
   * wrapper for config data
   */
  var Field = ClassExtender.extend({
    init: function (config) {
      for (var key in config) {
        if (!config.hasOwnProperty(key)) continue;
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

  return {

    title: 'Sfty.io',//'What happened?',

    calcGraphColor: function (index) {
      return this.__graphColors[index % this.__graphColors.length];
    },


    __graphColors: ['#000'],

    // __graphColors: [
    //   "#FF5A5E", "#FFC870", 
    //   "#5AD3D1", "#CD5C5C", 
    //   "#BDB76B", "#6B8E23", 
    //   "#008000", "#008B8B", 
    //   "#6A5ACD"
    // ],

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
          { id: 'pie',  name: 'pie chart'},
          { id: 'bar',  name: 'bar graph'  },
          { id: 'area', name: 'area graph' },
          { id: 'bell', name: 'bell curve' },
          { id: 'word', name: 'word cloud' },
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
        url: '/data/injuries',
        title: 'injury type',
        type: 'select',
        loaded: false,
        data: [],
      },
      cause: {
        group: 'injury',
        url: '/data/causes',
        title: 'Cause of Injury',
        type: 'select',
        loaded: false,
        data: [],
      },
      location: {
        group: 'injury',
        url: '/data/locations',
        title: 'Body Location of Injury',
        type: 'select',
        loaded: false,
        data: [],
      },
      activity: {
        group: 'injury',
        url: '/data/activities',
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
          { id: 'FULL TIME', name: 'Full time' },
          { id: 'PART TIME', name: 'Part time' },
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
        url: '/data/industries',
        title: 'industry of casualty',
        type: 'select',
        loaded: false,
        data: [],
      },
      occupation: {
        group: 'profile',
        url: '/data/occupations',
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
        var fields = {};
        var count  = 0;
        var fieldNames = _.keys(this.__fields);
        var totalFields = fieldNames.length;

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
      if (!(fieldName in this.__fields)) {
        throw new TypeError(fieldName + " is not part of config");
      }

      var field = new Field(this.__fields[fieldName]);

      if (field.loaded !== undefined && field.loaded === false) {
        //
        // load the data if it's need and to be loaded.
        //
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
        //
        // if the field does need to be requested then just resolve it.
        //
        return Promise.resolve(field);
      }
    },


    /**
     * Does an `id` lookup of `category` then gets
     * the `property` from it.
     *
     * lookupById :: Conf -> (Conf -> Map k v) -> k -> (v -> a) -> a
     * lookupById conf getCategory index property =
     *   let category = getCategory conf
     *       result = lookup category index
     *   in  property result
     *
     * @param config (object)
     *   category: String
     *   id:       Number
     *   property: String
     */
    lookupId: function (config) {
      var category = config.category;
      var id       = config.id;
      var property = config.property;

      return _.find(this.fields[category].data, function (e) {
        return e.id === id;
      })[property];
    },


  };
})();

