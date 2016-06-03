var express = require('express');
var router = express.Router();

var elastic = require('../elasticsearch');

/* carregar sugestões */
router.get('/sugestao/:input', function (req, res, next) {
    elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
});

router.get('/busca/:input', function (req, res, next) {
    elastic.search(req.params.input).then(function (result) { res.json(result) });
});

/* POST do disco a ser indexado */
router.post('/busca', function (req, res, next) {
    elastic.addDisco(req.body).then(function (result) { res.json(result) });
});

router.get('/limparbusca', function (req, res, next) {
    elastic.deleteIndex().then(function (result) { res.json(result) });
});

module.exports = router;