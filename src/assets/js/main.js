// Valida Número de Telefone
const length = 15;
$('#phone').mask('(00) 0000-00009');
$('#phone').on('blur', event => {
const { value } = event.target;
if (value.length === length) {
    $('#phone').mask('(00) 00000-0009');
} else {
    $('#phone').mask('(00) 0000-00009');
}
});


// Valida Formulário

$( "#form-web" ).validate({
    rules: {
        nome: {
            required: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
        phone:{
            required: true
        }
    },
    messages:{
        nome: {
            required: "Campo Obrigatório",
            minlength: "Nome deve Conter no Minimo 3 Letras"
        },
        email: {
            required: "Campo Obrigatório",
            email: "Email não é Válido"
        },
        phone:{
            required: "Campo Obrigatório"
        }
    }
  });