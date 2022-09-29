var mysql = require('mysql');
var configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: 3307,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}
//Pool de conexiones
//-Limite de conexiones abiertas
//-Si no está siendo utilizada, se libera
//- si no hay conexiones utilizadas, se crea una nueva
//- si llegamos al limite de conexiones, se espera a q una conexion se libere
//manejo eficiente de la libreria mysql de mutiples conexiones
// ala db, trae aparejado, el reutilizar los recursos
var pool = mysql.createPool(configMysql);
pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
                break;
            case 'ER_ACCESS_DENIED_ERROR':
                console.error('USUARIO O PASSWORD mal');
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