var respuesta = document.getElementById('respuesta')
var id = document.getElementById('id')
var nombre = document.getElementById('nombre')
var cantidad = document.getElementById('cantidades')
var btnPedido = document.getElementById('pedido')
var mensaje = document.getElementById('mensaje')

window.comunicacion.pedidos((event, args) => {
    respuesta.innerHTML = args
})

// FUNCION PARA SABER QUE OPCION DEL SELECT SE SELECCIONÓ
var s
var selection = document.getElementById("seleccion");
function select() {
    s = selection.options[selection.selectedIndex].value
    console.log(s)
}

window.comunicacion.boton2((events, args) => {
    // COLOCAR DATOS POR DEFECTO EN EL FORMULARIO DE PEDIDOS
    id.value = args
    window.comunicacion.consultaPedidos2(args)
    window.comunicacion.pedidos2( (events2, args2)=>{
    nombre.value = args2[0].nombre

    // BOTON PARA HACER EL PEDIDO
        btnPedido.addEventListener('click', () => {
            window.comunicacion.consultaProveedores([s, nombre.value])
            window.comunicacion.proveedores( (events3, args3) => {
                console.log(args3)
                window.comunicacion.noexiste( (ev, ar)=>{
                    alert(ar)
                })
                window.comunicacion.cerrar('result')
                window.comunicacion.guardarPedido([nombre.value, s, cantidad.value])
                window.comunicacion.existe( (events, args) => {
                    alert(args)
                })
            })
        })
    })
})