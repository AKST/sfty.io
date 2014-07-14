
Sfty.Router.map(function () {
  this.resource('queries',  { path: '/' }, function () {
    this.route('active');             
    this.route('complete');             
  });
});


Sfty.QueriesActiveRoute = Ember.Route.extend({
  model: function () {
    return this.store.filter('query', function (query) {
      return !query.get('isCompleted');
    });
  },

  renderTemplate: function (controller) {
    this.render('queries/index', { controller: controller });
  }
});


Sfty.QueriesCompleteRoute = Ember.Route.extend({
  model: function () {
    return this.store.filter('query', function (query) {
      return query.get('isCompleted');
    });
  },

  renderTemplate: function (controller) {
    this.render('queries/index', { controller: controller });
  }
});


Sfty.QueriesIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('queries');
  }
});


Sfty.QueriesRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('query');
  }
});

