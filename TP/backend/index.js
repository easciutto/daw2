var express = require('express');
var app = express();
var PORT = 3000;
const cors = require('cors');

//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');

//ruteo medición
var routerMedicion = require('./routes/medicion');

//ruteo electroválvula
var routerElectroval = require('./routes/electrovalvula');

//para parsear el body en el post
app.use(express.json());

//Configuracionde CORS
var corsConfig = {
    origin: '*',
    opionSuccessStatus:200
};

//Middleware CORS
app.use(cors(corsConfig));

//===[ Las siguientes lineas las incorporé para testear desde Postman request POST ]===
var bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//===================================================================================

//logger para registrar  en consola cada request
var logger = function(req, res, next){
    console.log("LOGGER API- " + new Date());
    next();

};
app.use(logger);

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMedicion);

app.use('/api/electrovalvula', routerElectroval);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});