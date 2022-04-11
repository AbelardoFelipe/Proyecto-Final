var respuesta = document.getElementById('respuesta')
var mylist = document.getElementById('mylist')

/**
 * USUARIO EXISTENTE
 */
window.comunicacion.consultaUsuario('result')
window.comunicacion.usuario( (event, args) => {
    respuesta.innerHTML = args
})

/**
 * LISTADO DE PRODUCTOS EXISTENTES
 */
window.comunicacion.consultaProductos('result')
window.comunicacion.productos( (event, args) => {
    let template = ""
    args.forEach(p => {
        template += `
         <tr id="filas">
            <td id="fila"> ${p.idProducto}</td>
            <td id="fila">${p.nombre}</td>
            <td id="fila">${p.descripcion}</td>
            <td id="fila">${p.categoria}</td>
            <td id="fila">${p.existencia}</td>
            <td id="fila">
              <button class="btn btn-modificar"
                id="btnmodificar"
                value="${p.idProducto}"
                > 
                Modificar
              </button>
             </td>
             
             <td id="fila">
               <button class="btn btn-pedido"   
                  id="btnpedido"
                  value="${p.idProducto}"
                  > 
                  Pedidos
              </button>
            </td>
         </tr>
      `
    });
    mylist.innerHTML = template

    /**
     * BOTON PARA MODIFICAR DATOS DE LOS PRODUCTOS
     */
    var botonModificar = document.querySelectorAll('.btn-modificar')
    botonModificar.forEach(boton => {
      boton.addEventListener('click', () => {
        console.log('funciona')
        window.comunicacion.modificarProductos('results')
        window.comunicacion.botonNumero(boton.value)
        console.log(boton.value)
      })
    })

    /**
     * BOTON PARA PEDIDOS
     */
    var botonPedidos = document.querySelectorAll('.btn-pedido')
    botonPedidos.forEach(boton => {
      boton.addEventListener('click', () => {
        window.comunicacion.consultaPedidos('results')
        window.comunicacion.botonNumero2(boton.value)
      })
    })
})