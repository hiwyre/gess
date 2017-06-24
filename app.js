//require('./dbconnection.js').open();


var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use(bodyParser());

//coneccion a base de datos



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/calavera');
//mongoose.connection.on("connected",function(){
//  console.log('mongose conected to mongodb://localhost:27017/calavera');
//});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//

var userSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  mensaje: { type: String, required: true },
  momento: { type: String, required: true },
  latitud: { type: String, required: true },
  longitud: { type: String, required: true },
});

var reporte = mongoose.model('reporte', userSchema);
module.exports = reporte;
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//parser no seguro
app.post('/', function(req, res) {

    var name = req.body.user_name;
    var message = req.body.user_message;
    var email = req.body.user_mail;
    var latitude= req.body.latitude;
    var longitude = req.body.longitude;
    var time = req.body.tiempo;

    //
    var Reporte = new reporte({
      nombre:name.toString() ,
      correo: email.toString() ,
      mensaje: message.toString() ,
      momento: time.toString() ,
      latitud: latitude.toString() ,
      longitud: longitude.toString(),
    });

    if (Reporte.nombre==''){
      Reporte.nombre='null';
    }

    if (Reporte.correo==''){
      Reporte.correo='null';
    }

    if (Reporte.mensaje==''){
      Reporte.mensaje='null';
    }

    if (Reporte.momento==''){
      Reporte.momento ='null';
    }

    //
    console.log('you posted: First Name: ');
 res.send(name + ' ; ' + message + ';' +email+';' +';'+time);

 Reporte.save(function(err) {
   if (err) throw err;

   console.log('User created!');
 });

});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);


module.exports = app;
