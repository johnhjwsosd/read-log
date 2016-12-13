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

function selectDataExtend(collectionname, condition) {
    let dbconfig = global.MONGO_DB_CONFIG;
    let db = mongoose.createConnection(dbconfig);
    mongoMocha(collectionname);
    var model = db.model(collectionname);
    var query = model.find({}, { "_id": 0, "__v": 0 });

    var where, skip, limit, sort;

    if (condition) {
        where = condition.where;
        skip = condition.skip;
        limit = condition.limit;
        sort = condition.sort;
    }

    if (where) {
        query.where(where);
    }
    if (skip) {
        query.skip(skip);
    }
    if (limit) {
        query.limit(limit);
    }
    if (sort) {
        query.sort(sort);
    }
    return new Promise(function (resolve, reject) {
        query.exec(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}



module.exports = {
    selectData: selectData,
    selectDataExtend: selectDataExtend
}

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});