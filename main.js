const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const {getConnection} = require('./conexion.js')
const conn = getConnection();
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * CREACION DE PRIMER VENTANA ***LOGIN***
 */
let ventana;
function createWindow() {
    ventana = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    ventana.loadFile('login.html')
}


/**
 * CREACION DE SEGUNDA VENTANA ***LISTA DE PRODUCTOS DISPONIBLES***
 */
let ventana2;
function createWindow2() {
    ventana2 = new BrowserWindow({
        width: 800,
        height: 850,
        webPreferences:{
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana2.loadFile('productos.html')
}


/**
 * CREACION DE TERCER VENTANA ***BOTON MODIFICAR***
 */
let ventana3;
function createWindow3() {
    ventana3 = new BrowserWindow({
        width: 800,
        height: 850,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana3.loadFile('edicion.html')
}


/**
 * CREACION DE CUARTA VENTANA ***BOTON PEDIDOS***
 */
let ventana4;
function createWindow4() {
    ventana4 = new BrowserWindow({
        width: 800,
        height: 850,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana4.loadFile('pedidos.html')
}


app.whenReady().then(createWindow)


/**
 * CONSULTAR SI EL USUARIO EXISTE EN LA BASE DE DATOS
 */
ipcMain.on('consultaUsuario', (event, args) => {
    conn.promise().execute('SELECT * FROM usuarios WHERE usuario = ?',
    [args[0]])
        .then(([results, fields]) => {
            console.log(results)
            if(results.length > 0){
                bcrypt.compare(args[1], results[0][1], function(err, result) {
                    createWindow2()
                    ventana.close()
                    ventana2.webContents.on('did-finish-load', () => {
                        ventana2.webContents.send('usuario', "Bienvenido " + results[0].nombre)
                    })
                });
            }
        })
})


/**
 * CONSULTAR A LA BASE DE DATOS LOS PRODUCTOS DISPONIBLES
 */
ipcMain.on('consultaProductos', (event, args) => {
    conn.promise().query('SELECT * FROM productos')
     .then(
         ([results, fields]) => {
             ventana2.webContents.send('productos', results)
             //ventana4.webContents.send('productos', results)
         }
     )
})


/**
 * ACTUALIZAR/MODIFICAR DATOS EN LA BASE DE DATOS
 */
ipcMain.on('modificarProductos', (event, args) => {
    createWindow3()
    ventana3.webContents.on('did-finish-load', () => {
        ventana3.webContents.send('modificar', "Bienvenido al editor de productos")
    })
})


/**
 * NUMERO DE ID QUE SE VA A MODIFICAR PARA LA VENTANA 3 MODIFICAR
 */
ipcMain.on('botonNumero', (event, args) => {
    ventana3.webContents.on('did-finish-load', () => {
        ventana3.webContents.send('boton', args)
    })
})


/**
 * NUMERO DE ID QUE SE VA A MODIFICAR PARA LA VENTANA 4 PEDIDOS
 */
ipcMain.on('botonNumero2', (event, args) => {
    ventana4.webContents.on('did-finish-load', () => {
        ventana4.webContents.send('boton2', args)
    })
})

/**
 * GUARDAR CAMBIOS/MODIFICACIONES DE LOS PRODUCTOS EN LA BASE DE DATOS
 */
ipcMain.on('guardarCambios', (event, args) => {
    conn.promise().query('UPDATE productos SET nombre = ?, descripcion = ?, categoria = ?, existencia = ? WHERE idProducto = ?', args)
})

/**
 * PEDIDOS
 */
ipcMain.on('consultaPedidos', (event, args) => {
    createWindow4()
    ventana4.webContents.on('did-finish-load', () => {
        ventana4.webContents.send('pedidos', "Realizar Pedidos")
    })
})

/**
 * CONSULTA PARA VER QUE PRODUCTO SE QUIERE PEDIR EN EL SCRIPT 'pedidos.js'
 */
ipcMain.on('consultaPedidos2', (event, args) => {
    conn.promise().query('SELECT * FROM productos WHERE idProducto = ?', args)
     .then(
         ([results, fields]) => {
             ventana4.webContents.send('pedidos2', results)
         }
     )
})


/**
 * INSERTAR UN PEDIDO A LA BASE DE DATOS
 * CONSULTAR A QUE PROVEEDORES SE LES HAN HECHO PEDIDOS Y SI YA EXISTE UN PEDIDO A UN MISMO PROVEEDOR NO SE REALIZARÁ EL PEDIDO
 */
 ipcMain.on('consultaProveedores', (event, args) => {
    conn.promise().query(`SELECT * FROM pedidos WHERE proveedor = ? && producto =  ?`, args)
     .then(
         ([results, fields]) => {
             ventana4.webContents.send('proveedores', results)
             if(results == ""){
                 console.log('vacio')
                 ipcMain.on('guardarPedido', (event, args) => {
                    conn.promise().query('INSERT INTO pedidos (producto, proveedor, cantidad) VALUES (?,?,?)', args)
                    ventana4.webContents.send('noexiste', 'Pedido realizado con exito')
                    console.log(results)
                })
             }else{
                 console.log('con datos')
                 ventana4.webContents.send('existe', 'Ya existe un pedido similar a este proveedor')
             }
         }
     )
})
