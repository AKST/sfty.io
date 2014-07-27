Sfty.Util.Rand = {
  /**
   * Provides a granteeded unique id
   */
  uid: function (prefix) {
    var timeString = Number(new Date()) + "",
        randNumber = Math.floor(Math.random() * Math.pow(10, 16)),
        randValue = randNumber + "_" + timeString; 

    if (prefix) {
      randValue = prefix + "_" + randValue;
    }

    return "__"+randValue;
  },
};
