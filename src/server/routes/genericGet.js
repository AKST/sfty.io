

module.exports = function (name) {
  return function (req, res) {
    var collection = req.db.collection(name);

    collection.find().toArray(function (e, docs) {
      res.json(docs);
    });
  };
};


