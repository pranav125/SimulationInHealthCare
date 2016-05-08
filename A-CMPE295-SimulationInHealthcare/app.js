
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,Patient = require('./routes/Patient')
  ,home = require('./routes/home');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var fs = require('fs');  
var bodyParser = require('body-parser');
var session = require('client-sessions');
var mysql = require('./routes/mysql');
var app = express();


// all environments
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({   
//	cookieName: 'session',    
//	secret: 'cmpe273_test_string_Pranav',    
//	duration: 30 * 60 * 1000,    //setting the time for active session
//	activeDuration: 5 * 60 * 1000,  
//	}));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/services',routes.services);
app.get('/blogs', routes.blogs);
app.get('/contacts', routes.contacts);

//For Doctor...
app.get('/orderTest', home.orderTest);
app.get('/doctorHome',home.doctorHome);
app.get('/showPatientNames',home.showPatientNames);
app.get('/Doctor_SignInSignUp',routes.Doctor_SignInSignUp);
app.get('/Patient_SignInSignUp',routes.Patient_SignInSignUp);
app.get('/searchPage',routes.searchPage);
app.get('/users', user.list);
app.post('/afterDoctorSignUp',home.afterDoctorSignUp);
app.post('/afterDoctorSignIn',home.afterDoctorSignIn);
app.post('/SearchPatient', home.SearchPatient);
app.post('/UpdateDoctorCommentsAndPrescription',home.UpdateDoctorCommentsAndPrescription);
app.post('/orderTestReport',home.orderTestReport);
app.post('/logout',home.logout);


//For Patient...
app.post('/afterPatientSignUp',Patient.afterPatientSignUp);
app.post('/afterPatientSignIn',Patient.afterPatientSignIn);
app.post('/medicalexpenses',Patient.medicalexpenses);
app.get('/home', Patient.home);
//app.post('/PatientDetails',Patient.PatientDetails);
//app.post('/AppointmentSchedule',Patient.AppointmentSchedule);
//app.post('/PatientExpenses',Patient.PatientExpenses);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
