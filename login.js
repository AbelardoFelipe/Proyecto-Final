var formulario = document.getElementById('formulario-login')
var usuario = document.getElementById('nombre-login')
var pass = document.getElementById('password-login')

var expMay = RegExp("[A-Z]")
var expMin = RegExp("[a-z]")
var expNum = RegExp("[0-9]")

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    var error = ""

    if (!pass.value.match(expMay)) {
        error += "Debe tener al menos una mayuscula"
    } if (!pass.value.match(expMin)) {
        error += "Debe tener al menos una minuscula"
    } if (!pass.value.match(expNum)) {
        error += "Debe tener al menos un número"
    } if (error == "") {
        window.comunicacion.consultaUsuario([usuario.value, pass.value]);
    } else {
        alert(error)
    }
})