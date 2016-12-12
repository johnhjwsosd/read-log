var restify = require('restify');
var api = require('./api');
var config = require('./config/config');
var server = restify.createServer({
    name: config.MicroService.Name,
    version: config.MicroService.Ver
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/api/:cmd', api.base.get);
server.post('/api/:cmd', api.base.post);


server.listen(config.Service.Port, function () {
    console.log('%s listening at %s', server.name, server.url);
});


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});