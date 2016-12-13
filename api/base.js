var base64 = require('../lib/base64.js');
var db = require('../lib/dbserver.js');
exports.name = 'base';

exports.get = function (req, res, next) {
    handle(req, res, next, 'get');
}
exports.post = function (req, res, next) {
    handle(req, res, next, 'post');
}

async function handle(req, res, next, type) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    var data = {};
    try {
        testbase64(req.params.data);
        if (req.params.cmd == "getlog") {
            var para = {};
            para = convertData(req.params.data);
            if (para) {
                global.MONGO_DB_CONFIG = para.host;
                var collectionname = para.tables;
                var condition = para.condition;
                if (condition) {
                    var result = await db.selectDataExtend(collectionname, condition);
                } else {
                    var result = await db.selectDataExtend(collectionname);
                }
                data.loglist = result;
            } else {
                data.Error = { state: -1, msg: "缺少参数data" };
            }
        } else {
            data.Error = { state: -1, msg: "错误的请求方法" };
        }

    } catch (error) {
        data.Error = { state: -1, msg: error.message };
    }
    res.send(data)
}


function convertData(data, result) {
    try {
        data = data.replace(/\s/g, '+')
        result = JSON.parse(base64.utf8(data))
        return result;
    } catch (err) {
        return;
    }
}

function testbase64(data) {
    console.log(base64.get(data));
}



