const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = "fruitsDB";

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected Successfully to the server");

  const db = client.db(dbName);
  // insertDocuments(db, function() {
  //   client.close();
  // });
  findDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  //get or create fruits collection
  const collection = db.collection('fruits');
  //insert some documents
  collection.insertMany([{
      name: 'Apple',
      score: 8,
      review: 'Great'
    },
    {
      name: 'Orange',
      score: 6,
      review: 'Sour'
    },
    {
      name: 'Banana',
      score: 9,
      review: "Great Stuff!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 docs into fruits");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  const collection = db.collection('fruits');
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the records");
    console.log(fruits);
    callback(fruits);
  });
}
