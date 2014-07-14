Sfty.EditQueryView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-query', Sfty.EditQueryView);

