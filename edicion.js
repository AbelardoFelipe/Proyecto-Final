var respuesta = document.getElementById('respuesta')
var id = document.getElementById('idInput')
var nombre = document.getElementById('nombreInput')
var descripcion = document.getElementById('descripcionInput')
var categoria = document.getElementById('categoriaInput')
var existencia = document.getElementById('existenciaInput')
var botonLimpar = document.getElementById('limpiar')
var botonGuardar = document.getElementById('guardar')

/**
 * *****LLAMADA AL MAIN PARA CARGAR ESTA VENTANA (VENTANA 3)*****
 */
window.comunicacion.modificar((event, args) => {
    respuesta.innerHTML = args
})

/**
 * *****RECIBIR NUMERO DE ID QUE SE VA A MODIFICAR*****
 * *****PARA OBTENER EL NUMERO AQUI PRIMERO SE OBTUVO EN EL SCRIPT 'productos.js'
 * LUEGO SE MANDÓ PARA EL MAIN Y DEL MAIN SE ENVIO AQUI*****
 */
window.comunicacion.boton((events, args) => {
    id.value = args

    /**
     * *****BOTON PARA LIMPIAR LOS CAMBIOS QUE SE QUIERAN HACER
     */
    botonLimpar.addEventListener('click', () => {
        nombre.value = ""
        descripcion.value = ""
        categoria.value = ""
        existencia.value = ""
    })

    /**
     * BOTON PARA GUARDAR LOS CAMBIOS QUE SE QUIERAN REALIZAR
     */
    botonGuardar.addEventListener('click', () => {
        window.comunicacion.guardarCambios([nombre.value, descripcion.value, categoria.value, existencia.value, id.value])
    })
})