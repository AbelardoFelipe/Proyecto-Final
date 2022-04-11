const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        consultaUsuario: (datos) => ipcRenderer.send('consultaUsuario', datos)
        ,
        usuario: (callback) => ipcRenderer.on('usuario', callback)
        ,
        consultaProductos: (datos) => ipcRenderer.send('consultaProductos', datos)
        ,
        productos: (callback) => ipcRenderer.on('productos', callback)
        ,
        modificarProductos: (datos) => ipcRenderer.send('modificarProductos', datos)
        ,
        modificar: (callback) => ipcRenderer.on('modificar', callback)
        ,
        botonNumero: (datos) => ipcRenderer.send('botonNumero', datos)
        ,
        boton: (callback) => ipcRenderer.on('boton', callback)
        ,
        botonNumero2: (datos) => ipcRenderer.send('botonNumero2', datos)
        ,
        boton2: (callback) => ipcRenderer.on('boton2', callback)
        ,
        guardarCambios: (datos) => ipcRenderer.send('guardarCambios', datos)
        ,
        consultaPedidos: (datos) => ipcRenderer.send('consultaPedidos', datos)
        ,
        pedidos: (callback) => ipcRenderer.on('pedidos', callback)
        ,
        consultaPedidos2: (datos) => ipcRenderer.send('consultaPedidos2', datos)
        ,
        pedidos2: (callback) => ipcRenderer.on('pedidos2', callback)
        ,
        cerrar: (datos) => ipcRenderer.send('cerrar', datos)
        ,
        guardarPedido: (datos) => ipcRenderer.send('guardarPedido', datos)
        ,
        consultaProveedores: (datos) => ipcRenderer.send('consultaProveedores', datos)
        ,
        proveedores: (callback) => ipcRenderer.on('proveedores', callback)
        ,
        existe: (callback) => ipcRenderer.on('existe', callback)
        ,
        noexiste: (callback) => ipcRenderer.on('noexiste', callback)
        ,
        passHash: (datos) => ipcRenderer.send('passHash', datos)
    }
)