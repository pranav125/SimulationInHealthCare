var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();
var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    var genderJson = JSON.parse(fs.readFileSync('./public/files/Sharma/Gender.txt', 'utf8'));
    var monthlyPatientsJson = JSON.parse(fs.readFileSync('./public/files/Sharma/Monthly Patients Chart.txt', 'utf8'));
    var ageJson = JSON.parse(fs.readFileSync('./public/files/Sharma/Age Groups.txt', 'utf8'));
    var monthlyDiseaseJson = JSON.parse(fs.readFileSync('./public/files/Sharma/Monthly Disease Count.txt', 'utf8'));
    res.render('index', {genderJson: genderJson, monthlyPatientsJson: monthlyPatientsJson, ageJson: ageJson, monthlyDiseaseJson: monthlyDiseaseJson});
});

app.get('/patient', function (req, res) {
   res.render('patient'); 
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(port);
console.log('Running on port ' + port);