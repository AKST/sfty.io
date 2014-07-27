var _ = require('underscore');

var captialize = function (str) {
  return str[0].toUpperCase() + 
         str.substr(1).toLowerCase();
};

var serializeDoc = function (doc) {
  return {
    id: doc.key,
    name: captialize(doc.description)
  };          
};


module.exports = function (name) {
  return function (req, res) {
    var collection = req.db.collection(name);

    collection.find().toArray(function (e, docs) {
      res.json(docs.map(serializeDoc));
    });
  };
};


