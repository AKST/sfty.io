Sfty.Queries = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("queries"),
  model: Sfty.Model
});
