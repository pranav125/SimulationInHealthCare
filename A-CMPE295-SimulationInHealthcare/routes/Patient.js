var ejs = require('ejs');
var mysql = require('./mysql');
var emailDoctorGlobal = '';
var firstnamepatientglobal ='';
var lastnamepatientglobal ='';



function afterPatientSignUp(req, res) {
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
		"firstname" : input.first_name,
		"lastname" : input.last_name,
		"email" : input.email,
		"password" : input.password
	};
	var query = newconnection.query('Insert INTO patient SET ?', data,
			function(err, result) {
				//newconnection.query("Insert INTO user_profile(user_id) Select uid from user_details where email='"+ data.email + "'");
				
				var getUser = "select * from patient where email = '"+ data.email + "'";

				console.log(getUser);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var firstname = req.body.first_name;
						var lastname = req.body.last_name;
						var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						var email = req.body.email;
					}
					if (results.length > 0) {
						
					    //req.session.email = results[0].email;
						//console.log(req.session.email);
						console.log("valid Login");
						ejs.renderFile('./views/afterDoctorSignin.ejs', {
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
				}, getUser);
			});

}

function afterPatientSignIn(req, res) {
	
     //var sess;
	var newconnection = mysql.getConnection();
	var input = JSON.parse(JSON.stringify(req.body));
	
	var email = req.param("email");
	var password = req.param("password");

	//var currentdate = new Date();
	console.log(input);
	console.log (input.email);
	console.log (input.password);
	var data = {
		"email" : input.email,
		"password" : input.password,
	};
				
//				var getUser = newconnection.query("select * from user_details where email ='" + input.email + "' AND password = '" + input.password + "'\"");
                  //var getUser = "select * from patient p where email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
                  //var getUser = "select * from doctor d ,user_profile p where d.uid = p.user_id and email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//					
//		console.log(req);
				var getUser = "select * from patient p, patientrecords r where p.email='"+input.email+"' and r.email='"+input.email+"'";
				mysql.fetchData(function(err, results) {

					if (err) {
						throw err;
					} else {
						var firstname = req.body.firstName;
						var lastname = req.body.lastName;
						//var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						//var email = req.body.email;
					}
					
					if(email === results[0].email && password === results[0].password){
						//Assigning sessions
						req.session.email = email;
						console.log("Session Initialized!!!");
						
						}
					
					if (results.length > 0) {
//					    req.session.email = results[0].email;
//					    req.session.password = results[0].password;
					    console.log(req.session.email);
					    console.log(results);
					   //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
						console.log("valid Login");
						
						//res.render('user', { title: "World's Largest Professional Network | LinkedIn" , summary:summary,education:education,skills:skills,experience:experience});
					
		    		
						//ejs.renderFile('./views/afterSignin.ejs', 
						
						
						res.render('welcomePatientPage.ejs' ,	{
							
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
				}, getUser);
			}


function PatientDetails(req,res){
	//if(req.session.email){
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
                    firstnamepatientglobal = " "+array[0];
                    lastnamepatientglobal = " "+array[1];
                    console.log(array[1]+" "+array[2]);
					var getUser = "select * from patientrecords p where p.firstname ='"+ firstnamepatientglobal + "' and p.lastname = '"+ lastnamepatientglobal + "' and p.DOCTORID = (select d.doctor_id from doctor d where d.email = '" + emailDoctorGlobal+"')";

                  //var getUser = "select * from doctor d ,user_profile p where d.uid = p.user_id and email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//			
//		console.log(req);
				
						mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				console.log(results);
			}
			if (results.length > 0) {
				
				console.log("valid Login");
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
		}, getUser);
}



function AppointmentSchedule(req, res){
	
	 var newconnection = mysql.getConnection();
	 var getUser1="select  * from doctor";
		
	 mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					
					//console.log(req.session.email);
					//console.log("valid Login");
					res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					//req.session = null;
					//req.session.destroy();
					
					res.redirect('/');
					
					
				res.render('index.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err, result) {
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


function medicalexpenses(req, res){
	if(req.session.email){
	 var newconnection = mysql.getConnection();
	 var getUser1="select * from patientexpenses where patientemail = '"+req.session.email+"'";
		
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
					
					//res.redirect('/');
					
					
				res.render('medicalexpenses.ejs',{results:results, title:""},function(err, result) {
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

function home(req, res){
	if(req.session.email){
		
			 var newconnection = mysql.getConnection();
			 var getUser1 = "select * from patient p, patientrecords r where p.email='"+req.session.email+"' and r.email='"+req.session.email+"'";
				
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
							
							//res.redirect('/');
							
							
						res.render('welcomePatientPage.ejs',{results:results, title:""},function(err, result) {
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
	


	





exports.afterPatientSignUp = afterPatientSignUp;
exports.afterPatientSignIn = afterPatientSignIn;
exports.medicalexpenses = medicalexpenses;
exports.home = home;

