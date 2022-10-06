var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve ese dispositivo
routerDispositivo.get('/:idDisp', function(req, res) {
    pool.query('Select * from Dispositivos d where d.dispositivoId=?', [req.params.idDisp], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Devuelve un array de mediciones para un id de dispositivo recibido por parámetro
routerDispositivo.get('/:id/mediciones', function(req, res) {
    let query = 'Select * from Mediciones m where m.dispositivoId = ? order by fecha desc';
    pool.query(query, [req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });
});

//Devuelve la ultima medición para un id de dispositivo recibido por parámetro
routerDispositivo.get('/:id/medicionActual', function(req, res) {
    let query = 'Select * from Mediciones m WHERE m.dispositivoId = ? order by m.fecha desc limit 1'
    pool.query(query, [req.params.id], function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);  //y si mando result[0] funciona igual??
        });
});

//Borro un dispositivo con id recibido por parámetro
routerDispositivo.delete("/:id", function(req,res) {
    console.log("Se recibe solicitud para BORRAR un dispositivo");
    let borrarDisp = 'Delete from Dispositivos where dispositivoId=?'; 
    pool.query(borrarDisp, [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });

});


module.exports = routerDispositivo;