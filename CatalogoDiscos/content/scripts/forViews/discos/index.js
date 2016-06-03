$(document).ready(function () {
    
    // Modal de confirmação do delete de um registro
    $('#deletar').on('show.bs.modal', function (e) {
        
        // carrega o atributo data-id
        var idDisco = $(e.relatedTarget).data('id');
        $(e.currentTarget).find('#modal-id').val(idDisco);
        $("#modal-btn-deletar").attr('ng-click', 'deleteDisco("' + idDisco + '")');
        
        var tituloDisco = $(e.relatedTarget).data('titulo');
        $("#modal-nome-disco").text(tituloDisco);
    });
    
    $('#searchString').on("keyup", function (event) {
        if (event.which == 13) {
            $("#buscar")[0].click();
        }
    });
});
//$scope.$on('someEvent', function (event, data) { console.log(data); });