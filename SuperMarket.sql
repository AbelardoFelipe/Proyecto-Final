DROP DATABASE supermarket;
CREATE DATABASE SuperMarket;
USE SuperMarket;

CREATE TABLE usuarios
	(
		idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100),
        usuario VARCHAR(25),
        contrasenia VARCHAR(25)
	);
    
CREATE TABLE proveedores
	(
		idProveedor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100),
        telefono VARCHAR(20),
        correo VARCHAR(50)
    );
    
CREATE TABLE productos
	(
		idProducto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100),
        descripcion VARCHAR(255),
        categoria VARCHAR(100),
        existencia INT
    );
    
INSERT INTO usuarios (nombre, usuario, contrasenia)
VALUES ("Abelardo Felipe", "felipe", "Felipe123");

INSERT INTO proveedores (nombre, telefono, correo)
VALUES ("coca-cola", "50235428792", "cocacola@gmail.com");

INSERT INTO productos (nombre, descripcion, categoria, existencia)
VALUES ("coca-cola sin azucar", "Bebida con soda libre de Azucar", "Bebidas", 100);

INSERT INTO productos (nombre, descripcion, categoria, existencia)
VALUES ("Jabon", "Jabon liquido para manos", "Limpieza", 35);

SELECT * FROM supermarket.usuarios;
SELECT * FROM supermarket.proveedores;
SELECT * FROM supermarket.productos;


SELECT * FROM productos WHERE idProducto = 1;

UPDATE productos SET nombre = "Coca-Cola", descripcion = "Refresco con soda libre de azucar" WHERE idProducto = 1;