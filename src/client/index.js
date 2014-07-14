window.Sfty = Ember.Application.create();

Sfty.ApplicationAdapter = DS.FixtureAdapter;

Sfty.Store = DS.Store.extend({
  adapter: 'DS.FixtureAdapter'
});

console.log('test');
