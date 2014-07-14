Sfty.Query = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Sfty.Query.FIXTURES = [
  {
    id: 1,
    title: 'test',
    isCompleted: false
  }, {
    id: 2,
    title: 'other test',
    isCompleted: true
  }, {
    id: 3,
    title: 'another other test',
    isCompleted: true
  }
];


