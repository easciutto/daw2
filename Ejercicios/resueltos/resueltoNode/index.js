var express = require('express');
var app = express();
var PORT = 3000;
//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo dispositivo
var routerMedicion = require('./routes/medicion');
//para parsear el body en el post
app.use(express.json());

//ejemplo de clase
var logger = function(req, res, next){
    console.log("LOGGER API- " + new Date());
    next();

};

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMedicion);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});