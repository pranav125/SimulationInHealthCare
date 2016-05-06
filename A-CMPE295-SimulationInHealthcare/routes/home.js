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
		"password" : input.password
	};
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
				
						mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				//var date = new Date();
				//console.log(results[0].nextappointment);
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
//						res.render('SearchPatient', {
//							results : results
//						}, function(err, result) {
//							// render on success
//							if (!err) {
//								res.end(results);
//							}
//							// render or error
//							else {
//								
//								console.log(err);
//								res.end('An error occurred');
//							}
//						});
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
				        
//		req.session.destroy(function(err){
//       if(err){
//               console.log(err);
//              }
//       else
//       {
//    	   res.render('index', { title: "World's Largest Professional Network | LinkedIn"});
//    	   req.session.reset();
//       }
//      });


}

function editProfile(req,res){
	
		if(req.session.email){
        	 console.log(req.session.email);
        var getUser2 = "select * from user_details d, user_profile p WHERE d.uid = p.user_id and email='"+req.session.email+"'" ;
        
     
     mysql.fetchData(function(err,results){
    	
        if(err){
    	  throw err;	
    	  }
    	
    	else{
    		if(results.length > 0){
    			console.log(results);
    			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    		  	res.render('editProfile.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
    		  	   
    		  	if(!err){
    		  		  res.end(result);   
    		  	   }
    		  	  
    		  	   else{
    		  		 res.end("An error occurred");
    		  		
    		  		 console.log(err);
    		  	   }
    		  	 });	  	
    		}	
    	}   		
     },getUser2);
     
      }
            else{
             res.render('index.ejs');	
            }
            
 }

 
function updateProfile(req,res){
	
	if(req.session.email){
    	   console.log(req.session.email);
    var newconnection = mysql.getConnection();
//   console.log(req);
	var input = JSON.parse(JSON.stringify(req.body));
	console.log("asdasdasdasdasdasdasd\n" + input);
	var currentdate = new Date();
	
	var data = {
	     
		  "summary" : input.summary,
		   "education" : input.education,
		   "skills" : input.skills,
		   "experience" : input.experience,
		   };
	 
//		   var post={
//		       //email : input.email,
//		        email : req.session.email,
//		   };
		   
		   
       console.log(input);

       console.log(req);
//       var query = newconnection.query("UPDATE user_profile set ? WHERE user_id IN (select uid from user_details where email="+ input.email  , data ,
   	
       
    var query = newconnection.query("update user_profile p JOIN user_details d ON (p.user_id='" +req.session.uid+"') SET ?", data ,
       function(err, result) {
	var getUser3 = "select  * from user_profile p, user_details d  where d.uid = p.user_id and summary = '"+ data.summary + "' and education = '"+ data.education + "' and skills = '"+ data.skills + "' and experience = '"+ data.experience + "'";

				console.log(getUser3);
				console.log("update:" +query);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var summary = req.body.summary;
						var education = req.body.education;
						var skills = req.body.skills;
						//console.log("Pasword length:" + password.length);
						var experience = req.body.experience;
					}
					if (results.length > 0) {
						req.session.email = results[0].email;
						   console.log(req.session.email);
						console.log("valid Login");
						ejs.renderFile('./views/afterSignin.ejs', {
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
				}, getUser3);
			});
		 }
         else{
          res.render('index.ejs');	
         }
     
 }

//function search(req, res){
//	
//   var newconnection = mysql.getConnection();
//
//   newconnection.query("select firstname from user_details",
//	   mysql.fetchData(function(err,rows,fields){
//       if(err) {throw err;}
//        res.end(JSON.stringify(rows));
//     }));
//}

//exports.search = search;


function afterconnections(req, res) {
	if (req.session.email) {
		console.log(req.session.email);
		var newconnection = mysql.getConnection();
		var input = JSON.parse(JSON.stringify(req.body));
		emailGlobal	=input.email;	
		console.log(input.email);
		if (typeof input.email !== 'undefined') {
			var data = {
				"email": input.email
			};
			//newconnection.query("Insert INTO connections(uid,email) Select uid,email from user_details where email='" + data.email + "'");
			
   
            // var getUser2 = "select * from user_details d, user_profile p WHERE d.uid = p.user_id and email='"+req.session.email+"'" ;
            var getUser2 = "select * from user_details where email ='" + data.email + "'";

            mysql.fetchData(function (err, results) {
                if (err) {
                    throw err;
                } else {
					if (results.length > 0) {
						console.log("inside the coonection:"+results[0].email);
						//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//						<!--res.render('connections.ejs', {
	//					results: results, title: "World's Largest Professional Network | LinkedIn"
		//				} -->
						
//						res.render('afterconnections.ejs' ,{
//							
//							results : results
//						}, function (err, result) {
//
//							if (!err) {
//								res.end(result);
//							} else {
//								res.end("An error occurred");
//								console.log(err);
//							}
//						});
	res.render('afterconnections.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
	  	   
	if(!err){
		  res.end(result);   
	   }
	  
	   else{
		 res.end("An error occurred");
		
		 console.log(err);
	   }
	 });
					}
                }
                }, getUser2);
        }
        else {
            res.render('connections.ejs', {
                title: "LinkedIn"
            });           
        	}
		}
		
		else {
            res.render('index.ejs');
        }
}          

function connections(req,res) {
	if(req.session.email){
		
	ejs.renderFile('./views/connections.ejs',{title:"LinkedIn"},function(err, result) {
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
	   else{
		 res.render("index.ejs");   
	   }
	   

}

function afterconnectionsAction(req, res) {
	var newconnection = mysql.getConnection();
           if(req.session.email){

			console.log(req.session.email);
			//console.log(req);
			var id = req.session.uid;
			var email= req.session.email;
			console.log("global email value is :"+emailGlobal);
			//var getUser2 = "select * from user_details d, user_profile p WHERE d.uid = p.user_id and email='"+req.session.email+"'" ;
			var data = {
			      uid  : req.session.uid,
			     email : emailGlobal,
			      isConnected : 0
			  };
			console.log(data.uid);
			console.log(data.email);
			console.log(data.isConnected);
			//var getUser2 = ('INSERT INTO connections SET ?', data);
			//var query = newconnection.query("Insert INTO connections(uid,email,isConnected) Values(" +data.uid+ ",'" +data.email+ "'," +data.isConnected+ "",function(err, result) {
				var query = newconnection.query("Insert INTO connections SET ?", data ,function(err, result) { 
			var getUser2 = "Select email from connections where email='"+data.email+"'";
			
			 console.log("QUERY:"+getUser2);
			
			mysql.fetchData(function(err,results){
	
				if(err){
					throw err;	
				}
	
				else{
					if(results.length > 0){
						console.log(results);
						
						res.render('afterconnectionsAction.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
		  	   
							if(!err){
				
							res.end(result);   
							}
		  	  
							else{
								res.end("An error occurred");
		  		
								console.log(err);
								}
		  	 });	  	
		}	
	}   		
},getUser2);
							});
 }
       else{
        res.render('index.ejs');	
       }
       
}         

function showconnections(req,res){
	
		if(req.session.email){
        	 console.log(req.session.email);
        var getUser2 = "select * from user_details where uid IN (Select uid from connections where email='"+req.session.email+"' and isConnected='1')";
        
     
        mysql.fetchData(function(err,results){
    	
        	if(err){
        		throw err;	
        	}
    	
        	else{
        		if(results.length > 0){
    			console.log(results);
    			
    		  	res.render('showconnections.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
    		  	   
    		  	if(!err){
    		  		  res.end(result);   
    		  	   }
    		  	  
    		  	   else{
    		  		 res.end("An error occurred");
    		  		
    		  		 console.log(err);
    		  	   }
    		  	 });	  	
    		}	
    	}   		
     },getUser2);
     
      }
            else{
             res.render('index.ejs');	
            }
            
 }

 function pendingRequests(req,res){
	
		if(req.session.email){
        	 console.log(req.session.email);
        	 
        //var getUser2 = "select * from user_details d, user_profile p WHERE d.uid = p.user_id and email='"+req.session.email+"'" ;
     //   var getUser2 = "Select * from connections where uid='"+req.session.uid+"'";
     var getUser2 = "Select * from user_details where uid IN (Select uid from connections where email='"+req.session.email+"')";
     mysql.fetchData(function(err,results){
    	
        if(err){
    	  throw err;	
    	  }
    	
    	else{
    		if(results.length > 0){
    			console.log(results);
    			
    		  	res.render('pendingRequests.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
    		  	   
    		  	if(!err){
    		  		  res.end(result);   
    		  	   }
    		  	  
    		  	   else{
    		  		 res.end("An error occurred");
    		  		
    		  		 console.log(err);
    		  	   }
    		  	 });	  	
    		}	
    	}   		
     },getUser2);
     
      }
            else{
             res.render('index.ejs');	
            }
            
 }

function acceptedRequest(req, res) {
	var newconnection = mysql.getConnection();
           if(req.session.email){

        	console.log(req.session.email);
			//console.log(req);
			//var id = req.session.uid;
			//var email= req.session.email;
			console.log("global email value is :"+emailGlobal);
			//var getUser2 = "select * from user_details d, user_profile p WHERE d.uid = p.user_id and email='"+req.session.email+"'" ;
			var data = {
			      uid  : req.session.uid,
			     email : emailGlobal,
			      isConnected : 0
			  };
			console.log(data.uid);
			console.log(data.email);
			console.log(data.isConnected);
			//var getUser2 = ('INSERT INTO connections SET ?', data);
			//var query = newconnection.query("Insert INTO connections(uid,email,isConnected) Values(" +data.uid+ ",'" +data.email+ "'," +data.isConnected+ "",function(err, result) {
				var query = newconnection.query("Update connections SET isConnected= 1", data ,function(err, result) { 
			var getUser2 = "Select * from user_details where uid IN (Select uid from connections where email='"+req.session.email+"')";
			
			 console.log("QUERY:"+getUser2);
			
			mysql.fetchData(function(err,results){
	
				if(err){
					throw err;	
				}
	
				else{
					if(results.length > 0){
						console.log(results);
						
						res.render('acceptedRequest.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
		  	   
							if(!err){
								res.end(result);   
							}
		  	  
							else{
								res.end("An error occurred");
		  		
								console.log(err);
								}
		  	 });	  	
		}	
	}   		
},getUser2);
							});
 }
       else{
        res.render('index.ejs');	
       }
       
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
	//var input = JSON.parse(JSON.stringify(req.body));
	//emailDoctorGlobal = input.email;
	//var currentdate = new Date();
//	console.log(input);
//	console.log (input.email);
//	console.log (input.password);
	//var email = req.param("email");
	//var password = req.param("password");
	
	
				
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


exports.doctorHome = doctorHome;
exports.acceptedRequest = acceptedRequest;
exports.pendingRequests = pendingRequests;
exports.showconnections = showconnections;
exports.afterconnectionsAction = afterconnectionsAction;
exports.afterconnections=afterconnections;
exports.connections = connections;
exports.afterDoctorSignUp = afterDoctorSignUp;
exports.afterDoctorSignIn = afterDoctorSignIn;
exports.SearchPatient = SearchPatient;
exports.UpdateDoctorCommentsAndPrescription = UpdateDoctorCommentsAndPrescription;
exports.logout = logout;
exports.editProfile = editProfile;
exports.updateProfile = updateProfile;

