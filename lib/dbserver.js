const mongoose = require('mongoose');
const mongoMocha = require('./dbmodel.js');
mongoose.Promise = require('bluebird');
function selectData(collectionname, where) {
    let dbconfig = global.MONGO_DB_CONFIG;
    let db = mongoose.createConnection(dbconfig);
    mongoMocha(collectionname);
    var model = db.model(collectionname);
    if (where) {
        return new Promise(function (resolve, reject) {
            model.find(where, { "_id": 0, "__v": 0 }, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    } else {
        return new Promise(function (resolve, reject) {
            model.find(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}



module.exports = {
    selectData: selectData,
}

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});