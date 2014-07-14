
Sfty.Router.map(function () {
  this.resource('query',  { path: '/' });
});


Sfty.QueryRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('query');
  }
});

