var mysql = require('mysql');
var configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: 3306,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}
//Pool de conexiones -caracteristicas
//- Limite de conexiones abiertas  : 10, para esta implementación.
//- Si no está siendo utilizada, se libera.
//- Si no hay conexiones utilizadas, se crea una nueva.
//- Si llegamos al limite de conexiones, se espera a que una conexion se libere.
//- Manejo eficiente de mutiples conexiones a la DB de la libreria mysql.

const pool = mysql.createPool(configMysql);

pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos llegó al límite de conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                console.error('USUARIO O PASSWORD erróneo');
                break;
            default:
                break;
        }
        if (connection) {
            connection.release();
        }
        return;
    }
});
module.exports = pool;