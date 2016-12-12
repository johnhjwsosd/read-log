var mongoose = require("mongoose");
var collectName;

var syslogSchema = new mongoose.Schema({
    title: String,
    content: {},
    level: String,
    createdate: Date
});

module.exports = function (collectName) {
    collectName = collectName;
    mongoose.model(collectName, syslogSchema);
}