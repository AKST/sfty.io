Sfty.QueryController = Ember.ObjectController.extend({

  actions: {
    editQuery: function () {
      this.set('isEditing', true);
    },

    acceptChanges: function () {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeQuery');
      }
      else {
        this.get('model').save();
      }
    },

    removeQuery: function () {
      var query = this.get('model');
      query.deleteRecord();
      query.save();
    }
  },

  isEditing: false,

  isCompleted: function (key, value) {
    var model = this.get('model');

    if (value === undefined) {
      return model.get('isCompleted');
    }
    else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

});
