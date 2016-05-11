var ejs = require('ejs');
var mysql = require('./mysql');
//var session = require('express-session');
//var session = require("client-sessions");
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');
var emailDoctorGlobal = '';
var firstnamepatientglobal ='';
var lastnamepatientglobal ='';
var patientName='';
//var mysql = require('./PoolManager.js');

exports.showPatientNames = function(req, res){
	var newconnection = mysql.getConnection();
//	newconnection.query("SELECT firstname, lastname from patient where firstname= '"+req.param("first_name")+"'",
	newconnection.query('SELECT firstname,lastname from patient where firstname like "%'+req.query.key+'%"',
	function(err, rows, fields) {
	if (err) {throw err;}
	var data=[];
	for(var i=0;i<rows.length;i++)
	{
		var fname = rows[i].firstname;
		var lname = rows[i].lastname;
		var str = fname.concat(lname);
	data.push(str);
	//data.push(rows[i].lastname);
	}
	
//	for(var j = 0; j<rows.length; j++){
//		data.push(rows[j].lastname);
//	}
	console.log(">>>"+	data);
	res.end(JSON.stringify(data));
	});
};

function afterDoctorSignUp(req, res) {
    console.log('Hi');
    //console.log(req.headers);
    console.log(req.body.first_name);
    //console.log(req.query.first_name);
    //console.log(req.body.first_name);
	var newconnection = mysql.getConnection();
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
	//var currentdate = new Date();
	var data = {
		"first_name" : input.first_name,
		"last_name" : input.last_name,
		"email" : input.email,
		"password" : input.password,
		"speciality" : input.specialty
	};
	
	//var input = JSON.parse(JSON.stringify(req.body));
    var strGender =  './public/files/sample/Gender.txt';
    var strAge = './public/files/sample/Age Groups.txt';
    var strMonthlyPatients = './public/files/sample/Monthly Patients Chart.txt';
    var monthlyDisease = './public/files/sample/Monthly Disease Count.txt';
    
    var genderJson = JSON.parse(fs.readFileSync(strGender, 'utf8'));
    var monthlyPatientsJson = JSON.parse(fs.readFileSync(strMonthlyPatients, 'utf8'));
    var ageJson = JSON.parse(fs.readFileSync(strAge, 'utf8'));
    var monthlyDiseaseJson = JSON.parse(fs.readFileSync(monthlyDisease, 'utf8'));
    
	var query = newconnection.query('Insert INTO doctor SET ?', data,
			function(err, result) {
				//newconnection.query("Insert INTO user_profile(user_id) Select uid from user_details where email='"+ data.email + "'");
				
				var getUser = "select * from doctor where email = '"+ data.email + "'";

				console.log(getUser);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var first_name = req.body.first_name;
						var last_name = req.body.last_name;
						var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						var email = req.body.email;
					}
					if (results.length > 0) {
						
					    //req.session.email = results[0].email;
						//console.log(req.session.email);
						console.log("valid Login");
						ejs.renderFile('./views/DoctorHomePage.ejs', {
							results : results,
							genderJson: genderJson,
							monthlyPatientsJson: monthlyPatientsJson,
							ageJson: ageJson,
							monthlyDiseaseJson: monthlyDiseaseJson
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser);
			});

}

function afterDoctorSignIn(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
    var strGender =  './public/files/' + input.email + '/Gender.txt';
    var strAge = './public/files/' + input.email + '/Age Groups.txt';
    var strMonthlyPatients = './public/files/' + input.email + '/Monthly Patients Chart.txt';
    var monthlyDisease = './public/files/' + input.email + '/Monthly Disease Count.txt';
    
    var genderJson = JSON.parse(fs.readFileSync(strGender, 'utf8'));
    var monthlyPatientsJson = JSON.parse(fs.readFileSync(strMonthlyPatients, 'utf8'));
    var ageJson = JSON.parse(fs.readFileSync(strAge, 'utf8'));
    var monthlyDiseaseJson = JSON.parse(fs.readFileSync(monthlyDisease, 'utf8'));
    //res.render('index', {genderJson: genderJson, monthlyPatientsJson: monthlyPatientsJson, ageJson: ageJson, monthlyDiseaseJson: monthlyDiseaseJson});
	
     //var sess;
	var newconnection = mysql.getConnection();
	
	emailDoctorGlobal = input.email;
	//var currentdate = new Date();
	console.log(input);
	console.log (input.email);
	console.log (input.password);
	var email = req.param("email");
	var password = req.param("password");
	
	var data = {
		"email" : input.email,
		"password" : input.password,
	};
				
//				var getUser = newconnection.query("select * from user_details where email ='" + input.email + "' AND password = '" + input.password + "'\"");
                  var getUser = "select * from doctor d where email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
                  //var getUser = "select * from doctor d ,user_profile p where d.uid = p.user_id and email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//			
//		console.log(req);
				
				mysql.fetchData(function(err, results) {

					if (err) {
						throw err;
					} else {
						var first_name = req.body.first_name;
						var last_name = req.body.last_name;
						//var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						//var email = req.body.email;
					}
					
					if(email === results[0].email && password === results[0].password){
						//Assigning sessions
						req.session.email = email;
						console.log("Session Initialized!!!");
						
						}

//					var first_name1 = req.body.first_name;
//				console.log("Hey"+results[0].email);
				if (results.length > 0) {
					console.log(req.session.email);
					//req.session.first_name = first_name1;
					    //req.session.password = results[0].password;
					    //console.log("Hey"+req.session.email);
//					    req.session.uid = results[0].uid;
//					   console.log(req.session.email);
//					  console.log(results);
//					   //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//						console.log("valid Login");
						
						//res.render('user', { title: "World's Largest Professional Network | LinkedIn" , summary:summary,education:education,skills:skills,experience:experience});
					
		    		
						//ejs.renderFile('./views/SearchPatient.ejs'), 
						
						//res.send('Welcome ' + req.session.email);
						//res.render('index', {genderJson: genderJson, monthlyPatientsJson: monthlyPatientsJson, ageJson: ageJson, monthlyDiseaseJson: monthlyDiseaseJson});
						res.render('DoctorHomePage.ejs',	{
							
							results : results,
							genderJson: genderJson,
							monthlyPatientsJson: monthlyPatientsJson,
							ageJson: ageJson,
							monthlyDiseaseJson: monthlyDiseaseJson
							//res.send('Welcome ' + req.session.first_name);
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser);

}


function SearchPatient(req,res){
	if(req.session.email){
	var newconnection = mysql.getConnection();
	var input = JSON.parse(JSON.stringify(req.body));
	
	//var currentdate = new Date();
	console.log(input);
		var data = {
		"first_name" : input.first_name
	};
				
//				var getUser = newconnection.query("select * from user_details where email ='" + input.email + "' AND password = '" + input.password + "'\"");
                  //var getUser = "select * from patient p where first_name = '"+ input.first_name + "'";
                    var str =input.first_name;
                    var array = str.split(" ");
                    firstnamepatientglobal = " "+array[1];
                    lastnamepatientglobal = " "+array[2];
                    console.log(array[1]+" "+array[2]);
					var getUser = "select * from patientrecords p where p.firstname ='"+ firstnamepatientglobal + "' and p.lastname = '"+ lastnamepatientglobal + "' and p.DOCTORID = (select d.doctor_id from doctor d where d.email = '" + emailDoctorGlobal+"')";

                  //var getUser = "select * from doctor d ,user_profile p where d.uid = p.user_id and email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//			
//		console.log(req);
					//console.log(results[0].firstname);
						mysql.fetchData(function(err, results) {
			if (err) {
				res.render('searchPatientError');
				throw err;
			} else {
				if(results.length === 0){
				res.render('searchPatientError');
				}
				
				//var date = new Date();
				//console.log(results[0].nextappointment);
			}
			if (results.length > 0) {
				
				console.log("valid Login");
				if(results[0].firstname === firstnamepatientglobal){
				ejs.renderFile('./views/PatientData.ejs', {
					results : results
				}, function(err, result) {
					// render on success
					if (!err) {
						res.end(result);
					}
					// render or error
					else {
						
						console.log(err);
						res.end('An error occurred');
					}
				});
					}
					else{ res.render('searchPatientError');}
			}
		}, getUser);
					}
}
					//}

function UpdateDoctorCommentsAndPrescription(req,res){
	
	if(req.session.email){
    	  // console.log(req.session.email);
    var newconnection = mysql.getConnection();
   console.log(req.body);
	var input = JSON.parse(JSON.stringify(req.body));
	console.log("asdasdasdasdasdasdasd\n" + input);
	//var currentdate = new Date();
	
	var data = {
		  "firstname" : firstnamepatientglobal,
		  "lastname" : lastnamepatientglobal,
		  "prescription" : input.prescription,
		  "doctorcomment" : input.doctorcomment
		  
		   };
	 console.log(data.firstname);
	 console.log(data.lastname);

	
			var query = newconnection.query("select doctor_id from doctor where email='"+emailDoctorGlobal+"'",
			function(err, result) {
				//newconnection.query("Insert INTO user_profile(user_id) Select uid from user_details where email='"+ data.email + "'");
				var input2 = JSON.parse(JSON.stringify(result));
				console.log(input2[0].doctor_id);
				var getUser = "Insert INTO patientrecords(prescription, doctorcomment,firstname,lastname,DOCTORID) values ('"+data.prescription+"','"+data.doctorcomment+"','"+data.firstname+"','"+data.lastname+"','"+ input2[0].doctor_id+"')";			
				var getUser1 = "Select * from patientrecords where prescription ='"+data.prescription+"' and doctorcomment='"+data.doctorcomment +"'and DOCTORID='"+ input2[0].doctor_id+"'";
				console.log(getUser);
				
				mysql.fetchData(function(err, results) {
					var insertionresult = JSON.parse(JSON.stringify(results));
					console.log("inside fetchdata");
					console.log(insertionresult.affectedRows);
					if (err) {
						throw err;
					} else {
						console.log(results);
					}
					if (insertionresult.affectedRows > 0) {
						console.log("HEUUUU");
					    //req.session.email = results[0].email;
						//console.log(req.session.email);
						console.log("valid Login");
						 res.render('SearchPatient', { title: 'Simulation In Healthcare' });

					}
				}, getUser);

							});	
			
				
				
			//});
		 }
     
 }



function logout(req,res){
	
   var newconnection = mysql.getConnection();
     //res.send('Your Awesome.');
     //var currentDate= new Date();
     //console.log(currentDate);
	 
     //newconnection.query("update user_details set ? where email='"+req.session.email+"'", {"lastLogin" : currentDate});
	 
	 var getUser1="select * from doctor";
		
	 mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					
					console.log(req.session.email);
					//console.log("valid Login");
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					//req.session = null;
					req.session.destroy();
					req.session.reset();
					
					res.redirect('/');
					
					
				res.render('Doctor_SignInSignUp.ejs',{results:results, title:"Simulation In Healthcare"},function(err, result) {
				        // render on success
				        if (!err) {
				        	
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
		     }
				        },getUser1);
				        }

function doctorHome(req, res) {
	if(req.session.email){
		
	//var input = JSON.parse(JSON.stringify(req.body));
    var strGender =  './public/files/' + req.session.email + '/Gender.txt';
    var strAge = './public/files/' + req.session.email + '/Age Groups.txt';
    var strMonthlyPatients = './public/files/' + req.session.email + '/Monthly Patients Chart.txt';
    var monthlyDisease = './public/files/' + req.session.email + '/Monthly Disease Count.txt';
    
    var genderJson = JSON.parse(fs.readFileSync(strGender, 'utf8'));
    var monthlyPatientsJson = JSON.parse(fs.readFileSync(strMonthlyPatients, 'utf8'));
    var ageJson = JSON.parse(fs.readFileSync(strAge, 'utf8'));
    var monthlyDiseaseJson = JSON.parse(fs.readFileSync(monthlyDisease, 'utf8'));
    //res.render('index', {genderJson: genderJson, monthlyPatientsJson: monthlyPatientsJson, ageJson: ageJson, monthlyDiseaseJson: monthlyDiseaseJson});
	
     //var sess;
	var newconnection = mysql.getConnection();

	
	
				
//				var getUser = newconnection.query("select * from user_details where email ='" + input.email + "' AND password = '" + input.password + "'\"");
                  var getUser = "select * from doctor d where email = '"+ req.session.email + "'";
                  //var getUser = "select * from doctor d ,user_profile p where d.uid = p.user_id and email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//			
//		console.log(req);
				
				mysql.fetchData(function(err, results) {

					if (err) {
						throw err;
					} else {
						var first_name = req.body.first_name;
						var last_name = req.body.last_name;
						//var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						//var email = req.body.email;
					}
					
//					if(email === results[0].email && password === results[0].password){
//						//Assigning sessions
//						req.session.email = email;
//						console.log("Session Initialized!!!");
//						
//						}

//					var first_name1 = req.body.first_name;
//				console.log("Hey"+results[0].email);
				if (results.length > 0) {
					console.log(req.session.email);
					//req.session.first_name = first_name1;
					    //req.session.password = results[0].password;
					    //console.log("Hey"+req.session.email);
//					    req.session.uid = results[0].uid;
//					   console.log(req.session.email);
//					  console.log(results);
//					   //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//						console.log("valid Login");
						
						//res.render('user', { title: "World's Largest Professional Network | LinkedIn" , summary:summary,education:education,skills:skills,experience:experience});
					
		    		
						//ejs.renderFile('./views/SearchPatient.ejs'), 
						
						//res.send('Welcome ' + req.session.email);
						//res.render('index', {genderJson: genderJson, monthlyPatientsJson: monthlyPatientsJson, ageJson: ageJson, monthlyDiseaseJson: monthlyDiseaseJson});
						res.render('DoctorHomePage.ejs',	{
							
							results : results,
							genderJson: genderJson,
							monthlyPatientsJson: monthlyPatientsJson,
							ageJson: ageJson,
							monthlyDiseaseJson: monthlyDiseaseJson
							//res.send('Welcome ' + req.session.first_name);
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser);
							}
}

function orderTest(req,res){
	
	if(req.session.email){
	var newconnection = mysql.getConnection();
	 var getUser1="SELECT * FROM patientrecords JOIN doctor ON (patientrecords.DOCTORID = doctor.doctor_id) where doctor.email ='"+req.session.email+"'";
		
	 mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					
					console.log(req.session.email);
					//console.log("valid Login");
					//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					//req.session = null;
					//req.session.destroy();
					//req.session.reset();
					
					//res.redirect('/');
					
					
				res.render('orderTest.ejs',{results:results, title:"Simulation In Healthcare"},function(err, result) {
				        // render on success
				        if (!err) {
				        	
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
		     }
				        },getUser1);
	 }
	}

	
function orderTestReport(req, res){
	if(req.session.email){
		var newconnection = mysql.getConnection();
		var input = JSON.parse(JSON.stringify(req.body));
		console.log("asdasdasdasdasdasdasd\n" + input);
		//var currentdate = new Date();
		
		var data = {
			  "testName" : input.field1,
			  "patientName" : input.field2,
			  "age" : input.age,
			  "gender" : input.gender,
			  "Pathologist" : input.Pathologist,
			  "Diagnosis" : input.Diagnosis,
			  "Specifcations" : input.Specifications
			  };
		

		
				var query = newconnection.query("select doctor_id from doctor where email='"+req.session.email+"'",
				function(err, result) {
					//newconnection.query("Insert INTO user_profile(user_id) Select uid from user_details where email='"+ data.email + "'");
					var input2 = JSON.parse(JSON.stringify(result));
					//console.log(input2[0].doctor_id);
					var getUser = "Insert INTO ordertestreport (testName, patientName,age,gender,Pathologist,Diagnosis,Specifcations,doctorName) values ('"+data.testName+"','"+data.patientName+"','"+data.age+"','"+data.gender+"','"+ data.Pathologist+"','"+ data.Diagnosis+"','"+ data.Specifcations+"','"+ req.session.email+"')";			
					var getUser1 = "Select * from ordertestreport where testName ='"+data.testName+"' and patientName='"+data.patientName +"'and DOCTORID='"+ input2[0].doctor_id+"'";
					console.log(getUser);
					
					mysql.fetchData(function(err, results) {
						var insertionresult = JSON.parse(JSON.stringify(results));
						console.log("inside fetchdata");
						console.log(insertionresult.affectedRows);
						if (err) {
							throw err;
						} else {
							console.log(results);
						}
						if (insertionresult.affectedRows > 0) {
							console.log("HEUUUU");
						    //req.session.email = results[0].email;
							//console.log(req.session.email);
							console.log("valid Login");
							 res.render('orderTest', { title: 'Simulation In Healthcare' });

						}
					}, getUser);

								});	
				
					
					
		
	}
	

}

exports.orderTestReport = orderTestReport;
exports.orderTest = orderTest;
exports.doctorHome = doctorHome;
exports.afterDoctorSignUp = afterDoctorSignUp;
exports.afterDoctorSignIn = afterDoctorSignIn;
exports.SearchPatient = SearchPatient;
exports.UpdateDoctorCommentsAndPrescription = UpdateDoctorCommentsAndPrescription;
exports.logout = logout;


