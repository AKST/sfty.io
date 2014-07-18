
Sfty.Str = {

  /**
   * capitalizes all words in a string
   */
  captialize: function (s) {
    return s.split(' ').map(function (w) {
      return w[0].toUpperCase() + w.substr(1).toLowerCase();
    }).join(' ');
  },
}; 
