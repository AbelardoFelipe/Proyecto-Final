const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'AbelardoFelipe',
    password: '21000790',
    database: 'SuperMarket'
})

function getConnection() {
    return connection
}

module.exports = {getConnection}