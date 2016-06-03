app.controller('discoController', function ($scope, discosCRUD) {
    
    $scope.idDisco = "";
    $scope.genero = []; 

    $scope.getAllDisco = function () {
        discosCRUD.getAllDiscos().then(function (discos) {
            $scope.discos = discos;
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.addDisco = function () {
        // Valida o form
        if (!$('#form').valid()) {
            return;
        }
        
        // Carrega os gêneros do selectize
        var generos = $("#genero");

        var generoAtualizado = [];
        if (generos) {
            genSplit = generos.val().split(',');

            for (i = 0; i < genSplit.length; i++) {
                generoAtualizado.push({ nome: genSplit[i] });
            }
        }

        discosCRUD.addDisco({ titulo: $scope.titulo, descricao: $scope.descricao, ano_lancamento: $scope.ano_lancamento, "artista": $scope.artista, "genero": generoAtualizado })
        .then(function (newDisco) {
            //$scope.discos.push(newDisco);
            discosCRUD.addDiscoElasticSearch(newDisco);
            window.location.href = "/discos";
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.updateDisco = function () {
        // Valida o form
        if (!$('#form').valid()) {
            return;
        }
        
        // Carrega os gêneros do selectize
        var generos = $("#genero");
        
        var generoAtualizado = [];
        if (generos) {
            genSplit = generos.val().split(',');
            
            for (i = 0; i < genSplit.length; i++) {
                generoAtualizado.push({ nome: genSplit[i] });
            }
        }
        
        $scope.disco.genero = generoAtualizado;
        
        discosCRUD.updateDisco($scope.disco)
        .then(function (newDisco) {
            //$scope.discos.push(newDisco);
            window.location.href = "/discos";
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.getDisco = function () {
        //var idItem = $scope.idDisco;
        var idItem = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        discosCRUD.getDisco(idItem)
            .then(function (result) {
            if (result.status === 200) {
                $scope.disco = result.data;
                carregarGeneros($scope.disco.genero);
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.buscarDisco = function () {
        //var idItem = $scope.idDisco;
        var query = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        discosCRUD.buscarDisco(query)
            .then(function (result) {
            if (result.status === 200) {
                $scope.discos = result.data;
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.autoCompleteDisco = function () {
        //var idItem = $scope.idDisco;
        var query = $scope.searchString;
        if (query.length < 1) {
            return;
        }
        discosCRUD.autoCompleteDisco(query)
            .then(function (result) {
            if (result.status === 200) {
                $scope.discos = result.data;
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.deleteDisco = function (idDisco) {
        //var idItem = $scope.idDisco;
        var idItem = idDisco;
        discosCRUD.deleteDisco(idItem)
            .then(function (result) {
            if (result.status === 200) {
                //console.log("deletado com sucesso");
                $scope.getAllDisco();
                window.location.href = "/discos";
            }
        }, function (error) {
            console.log(error);
        });        
    };

    function carregarGeneros(generos){
        var $selectize = $('#genero').selectize();
        var selectize = $selectize[0].selectize;
        
        //var generoAtualizado = ["adsd", "asddsd"];
        for (i = 0; i < generos.length; i++) {
            selectize.createItem(generos[i].nome, true)
        }
    }
});