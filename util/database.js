const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {

    MongoClient.connect(
       //'mongodb+srv://obusorezekiel:obuumesi4@cluster0-uz0nu.mongodb.net/test?retryWrites=true&w=majority'
       'mongodb://127.0.0.1:27017/shop-practice'
    ).then(client => {
        console.log('Connected!');
        _db = client.db()
        callback();
    })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
