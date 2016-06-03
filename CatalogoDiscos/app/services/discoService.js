var app = angular.module('discoService', []);

app.factory('discosCRUD', function ($http, $q) {
    var baseurl = "/app/";
    function getAllDiscos() {
        var deferred = $q.defer();

        $http.get(baseurl+'api/discos').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    
    function getDisco(idItem) {
        var deferred = $q.defer();
        
        $http.get(baseurl + 'api/discos/' + idItem).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function buscarDisco(query) {
        var deferred = $q.defer();
        
        $http.get('/discos/busca/' + query).then(function (data) {
            var discos = [];
            for (i = 0; i < data.data.hits.hits.length; i++) {
                discos.push(data.data.hits.hits[i]._source);
            }
            
            data.data = discos;
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }

    function addDisco(item) {
        var deferred = $q.defer();
        
        var idDisco = 0;
        // insere o disco
        $http.post(baseurl + 'api/discos', item).then(function (result) {
            deferred.resolve(result.data.disco);
            idDisco = result.data.disco._id;
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function addDiscoElasticSearch(item) {
        var deferred = $q.defer();
        
        var itemBusca = {
            id: item._id,
            title: item.titulo,
            content: item.artista.nome,
            metadata: {
                titleLength: item.titulo.length
            }
        };

        // insere o disco no elastic search
        $http.post('busca', itemBusca).then(function (result) {
            deferred.resolve(result.data.disco);
        }, function (error) {
            console.log("Erro no discoService.addDiscoElasticSearch(). " + error)
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function updateDisco(item) {
        var deferred = $q.defer();

        $http.put(baseurl + 'api/discos/' + item._id, item).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
    
    function deleteDisco(idItem) {
        var deferred = $q.defer();
        
        $http.delete(baseurl + 'api/discos/'+ idItem).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }

    return {
        getAllDiscos: getAllDiscos,
        getDisco: getDisco,
        addDisco: addDisco,
        updateDisco: updateDisco,
        deleteDisco: deleteDisco,
        addDiscoElasticSearch: addDiscoElasticSearch,
        buscarDisco: buscarDisco
    };
});