// Abrindo conexão com o mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/discos");
var db = mongoose.connection;
var ObjectId = mongoose.Types.ObjectId;

var Schema = mongoose.Schema;
// Schema da collection
var discoSchema = new Schema({
    titulo: String,
    descricao: String,
    ano_lancamento: Number,
    artista: { nome: String },
    genero: [{ nome: String }],
    faixas: [{ nome: String }]
});

var DiscoModel = mongoose.model('disco', discoSchema);

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("Abrindo banco disco...");
    
    DiscoModel.find().exec(function (error, results) {
        if (results.length === 0) {
            console.log("inserindo registros de inicialização no banco...");
            
            DiscoModel.create({
                _id: "574fdf0d3e34c09416f72c3a"
                , titulo: "Dark Side of the Moon"
                , descricao: "O disco marca uma nova fase no som da banda, com letras mais pessoais e instrumentais menores, contendo alguns dos mais complicados usos dos instrumentos e efeitos sonoros existentes na época, incluindo o som de alguém correndo à volta de um microfone e a gravação de múltiplos relógios a tocar ao mesmo tempo."
                , ano_lancamento: 1973
                , artista: { nome: "Pink Floyd" }
                , genero: [{ nome: "Rock" }, { nome: "Rock Psicodélico" }]
                , faixas: [{ nome: "Speak To Me" }, { nome: "Breathe" }]
            });

            DiscoModel.create({
                _id: "574fdf478f75766c01fe5d69"
                , titulo: "The Wall"
                , descricao: "The wall."
                , ano_lancamento: 1979
                , artista: { nome: "Pink Floyd" }
                , genero: [{ nome: "Rock" }, { nome: "Rock Psicodélico" }]
                , faixas: [{ nome: "In the Flesh" }]
            });


        }
    });
});

exports.getAll = function (request, response) {
    DiscoModel.find().exec(function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
};

exports.get = function (request, response) {
    var id = request.params.idItem;
    DiscoModel.findById(id, function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
};

exports.add = function (request, response) {
    var disco = {
        titulo: request.body.titulo, descricao: request.body.descricao, ano_lancamento: request.body.ano_lancamento, 
        artista: request.body.artista, genero: request.body.genero, faixas: request.body.faixas
    };
    DiscoModel.create(disco, function (addError, discoAdicionado) {
        if (addError) {
            response.send(500, { error: addError });
        }
        else {
            response.send({ success: true, disco: discoAdicionado });
        }
    });
};

exports.update = function (request, response) {
    //var idDisco = request.params.idDisco;
    var idDisco = request.body._id;
    DiscoModel.update({ _id: idDisco }, {
        titulo: request.body.titulo, descricao: request.body.descricao, ano_lancamento: request.body.ano_lancamento, 
        artista: request.body.artista, genero: request.body.genero, faixas: request.body.faixas
    }, { multi: false },
        function (error, rowsAffected) {
        if (error) {
            response.send(500, { error: error });
        }
        else if (rowsAffected == 0) {
            response.send(500, { error: "No rows affected" });
        }
        else {
            response.send(200);
        }
    });
};

exports.delete = function (request, response) {
    var idItem = request.params.idItem;
    DiscoModel.remove({ _id: new ObjectId(idItem) },
        function (error, results) {
        if (error) {
            response.send(500, { error: error });
        }
        else {
            response.send(200);
        }
    });
};