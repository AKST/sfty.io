Sfty.Util.Arrays = {

  toObject: function (arr, key, value) {
    return _.object(_.map(arr, function(row){
      return [row[key], row[value]]; 
    }));
  },

  fromObject: function (arr, key, value) {
    return _.pairs(arr).map(function (row) {
      var out = {};
      out[key] = row[0];
      out[value] = row[1];
      return out;
    });
  },

};
