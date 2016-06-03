// instancia o selectize
var $generos = $('#genero').selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    render: {
        option_create: function (data, escape) {
            return '<div class="create">Pressione enter para adicionar <strong>' + escape(data.input) + '</strong>&hellip;</div>';
        }
    },
    create: function (input) {
        return {
            value: input,
            text: input
        }
    }
});

//regras de validação
$("#form").validate({
    rules: {
        ano_lancamento: {
            required: true,
            range: [1900, 2100]
        }
    }
});

