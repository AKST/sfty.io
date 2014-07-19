
$('body').ready(function () {
  var body, groupOrder, transformToRecord;

  groupOrder = function (item) {
    return Sfty.Config.groupOrder.indexOf(item[0]); 
  };

  transformToRecord = function (item) { 
    return {
      group: Sfty.Config.fieldGroups[item[0]], 
      fields: item[1]
    };
  };

  body = $('body')[0];

  React.renderComponent(Sfty.View.App({
    title: Sfty.Config.title,
    groups: _
     .chain(Sfty.Config.fields())
     .groupBy('group')
     .pairs()
     .sortBy(groupOrder)
     .map(transformToRecord)
     .value()
  }), body);
});

