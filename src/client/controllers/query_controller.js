Sfty.QueryController = Ember.ArrayController.extend({
  actions: {
    createQuery: function () {
      var title = this.get('newTitle');
      if (!title) { return false; }
      if (!title.trim()) { return; }

      var query = this.store.createRecord('query', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');
      query.save();
    }
  }
});
