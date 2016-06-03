var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "discos";

/**
* Delete an existing index
*/
function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "disco",
        body: {
            properties: {
                title: { type: "string" },
                content: { type: "string" },
                id: { type: "string" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple",
                    payloads: true
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function addDisco(disco) {
    return elasticClient.index({
        index: indexName,
        type: "disco",
        body: {
            title: disco.title,
            content: disco.content,
            id: disco.id,
            suggest: {
                input: disco.title.split(" "),
                output: disco.title,
                payload: disco.metadata || {}
            }
        }
    });
}
exports.addDisco = addDisco;

function getSuggestions(input) {
    return elasticClient.suggest({
        index: indexName,
        type: "disco",
        body: {
            docsuggest: {
                text: input,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    })
}
exports.getSuggestions = getSuggestions;

function search(input) {
    return elasticClient.search({
        index: indexName,
        body: {
            query: {
                match: {
                    "_all": input
                    //, body: input
                }
            }
        }
    });
}

exports.search = search;
