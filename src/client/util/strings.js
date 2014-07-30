
Sfty.Util.Str = {

  /**
   * capitalizes all words in a string
   */
  captialize: function (s) {
    return s.split(' ').map(function (w) {
      return w[0].toUpperCase() + w.substr(1).toLowerCase();
    }).join(' ');
  },

  /**
   * with pair
   *   - ['a', 10]
   *   - ['b', [1, 2]]
   *
   * you get
   *   - 'a=10'
   *   - 'b=1,2'
   */
  __pairToArg: function (pair) {
    var name = pair[0];
    var rawValue = pair[1];
    
    return name + '=' + (_.isArray(rawValue) ? 
      rawValue.join(',') : 
      rawValue.toString());
  },


  /**
   * url is a computed property.
   *
   * Is basically the endpoint property with the 
   * data transformed into query arguments.
   *
   * with 
   *  - endpoint '/data'
   *  - data { a: [1,2,3], b: "hello" }
   *
   * you get
   *  - '/data?a=1,2,3&b=hello'
   *
   */
  generateUrlParams: function (obj) {
    var endpoint = obj.endpoint;
    var params = obj.params;

    if (_.keys(params).length) {
      endpoint += '?';
      endpoint += _
        .pairs(params)
        .map(this.__pairToArg)
        .join('&');
    }
    return endpoint;
  },

}; 
