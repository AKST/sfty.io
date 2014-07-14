
Sfty.Router.map(function () {
  this.resource('queries',  { path: '/' }, function () {
    this.route('active');             
    this.route('complete');             
  });
});


Sfty.RenderIndex = Ember.Mixin.create({
  renderTemplate: function (controller) {
    this.render('queries/index', { controller: controller });
  }
});


Sfty.QueriesActiveRoute = Ember.Route.extend(Sfty.RenderIndex, {
  model: function () {
    return this.store.filter('query', function (query) {
      return !query.get('isCompleted');
    });
  }
});


Sfty.QueriesCompleteRoute = Ember.Route.extend(Sfty.RenderIndex, {
  model: function () {
    return this.store.filter('query', function (query) {
      return query.get('isCompleted');
    });
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

