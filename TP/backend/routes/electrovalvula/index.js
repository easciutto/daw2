var express = require('express');
var routerElectroValvula = express.Router();
var pool = require('../../mysql');

//Devuelve un array de logs de riego de la electroválvulaId recibida por parámetro
routerElectroValvula.get('/:id/logs', function(req, res) {
    pool.query('SELECT * From Log_Riegos WHERE electrovalvulaId = ? ORDER BY fecha DESC', [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});

//Registro la apertura de la electrovalvula recibida por parámetro en la tabla Log_Riegos
routerElectroValvula.put('/:id/abrir', function(req, res) {
    pool.query('Insert into Log_Riegos (fecha,apertura,electrovalvulaId) values (?,?,?)', [new Date(), true, req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                console.log(err);
                return;
            }
            res.send(result);
        });
});

//Registro el cierre de la electrovalvula recibida por parámetro en la tabla Log_Riegos
routerElectroValvula.put('/:id/cerrar', function(req, res) {
    pool.query('Insert into Log_Riegos (fecha,apertura,electrovalvulaId) values (?,?,?)', [new Date(), false, req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
    });
});

module.exports = routerElectroValvula;