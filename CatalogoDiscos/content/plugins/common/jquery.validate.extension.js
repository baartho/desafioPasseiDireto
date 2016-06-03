jQuery.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório.",
    remote: "Please fix this field.",
    email: "Por favor preencha um email válido.",
    url: "Por favor preencha uma URL válida.",
    date: "Por favor preencha uma data válida.",
    dateISO: "Por favor preencha uma data(ISO) válida.",
    number: "Por favor preencha um número válido.",
    digits: "Por favor preencha apenas dígitos.",
    creditcard: "Por favor preencha um número de cartão de crédito válido.",
    equalTo: "Por favor preencha o mesmo valor novamente.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Por favor não escreva mais que {0} caracteres."),
    minlength: jQuery.validator.format("Por favor escreva pelo menos {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor escreva entre {0} e {1} caracteres."),
    range: jQuery.validator.format("Por favor preencha um valor entre {0} e {1}."),
    max: jQuery.validator.format("Por favor preencha um valor menor ou igual que {0}."),
    min: jQuery.validator.format("Por favor preencha um valor maior ou igual que {0}.")
});

$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});