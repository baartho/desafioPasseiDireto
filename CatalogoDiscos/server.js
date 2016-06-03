var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var elastic = require('./server/elasticsearch');

var port = process.env.port || 1337;

var app = express();
app.use(bodyParser());

var mongoOps = require('./server/discoDb.js');
// Define as operações REST
app.get('/app/api/discos', mongoOps.getAll);
app.get('/app/api/discos/:idItem', mongoOps.get);
app.post('/app/api/discos', mongoOps.add);
app.put('/app/api/discos/:discoId', mongoOps.update);
app.delete('/app/api/discos/:idItem', mongoOps.delete);

//app.use("/app", express.static(__dirname + "/app"));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use('/content', express.static(path.join(__dirname, 'content')));

app.get('/', function (request, response) {
    response.sendfile("app/views/discos/index.html");
});

app.get('/discos', function (request, response) {
    response.sendfile("app/views/discos/index.html");
});

app.get('/discos/criar', function (request, response) {
    response.sendfile("app/views/discos/criar.html");
});

app.get('/discos/editar/:idItem', function (request, response) {
    response.sendfile("app/views/discos/editar.html");
});

app.get('/discos/search/:query', function (request, response) {
    response.sendfile("app/views/discos/search.html");
});

var discosSearchRoute = require('./server/routes/discosSearchRoute');
app.use('/discos', discosSearchRoute);

elastic.indexExists().then(function (exists) {
    if (exists) {
        return elastic.deleteIndex();
    }
}).then(function () {
    return elastic.initIndex().then(elastic.initMapping).then(function () {
        var promises = [
            { titulo: 'Dark Side of the Moon', artista: "Pink Floyd", id: "574fdf0d3e34c09416f72c3a" },
            { titulo: 'The Wall', artista: "Pink Floyd", id: "574fdf478f75766c01fe5d69" }
        ].map(function (tituloDisco) {
            return elastic.addDisco({
                title: tituloDisco.titulo,
                content: tituloDisco.artista,
                id: tituloDisco.id,
                metadata: {
                    titleLength: tituloDisco.length
                }
            });
        });
        return Promise.all(promises);
    });
});

module.exports = router;

app.listen(port);