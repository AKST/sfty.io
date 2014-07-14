Sfty.Query = DS.Model.extend({
  title: DS.attr('string'),
  isComplete: DS.attr('boolean')
});

Sfty.Query.FIXTURES = [
  {
    id: 1,
    title: 'test',
    isComplete: false
  }, {
    id: 2,
    title: 'otherTest',
    isComplete: true
  }
];


