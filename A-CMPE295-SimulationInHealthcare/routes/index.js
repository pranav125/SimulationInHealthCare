
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.Doctor_SignInSignUp = function(req, res){
  res.render('Doctor_SignInSignUp', { title: 'Express' });
};

exports.Patient_SignInSignUp = function(req, res){
  res.render('Patient_SignInSignUp', { title: 'Express' });
};

exports.searchPage = function(req, res){
  res.render('SearchPatient', { title: 'Express' });
};

exports.contacts = function(req, res){
  res.render('contacts', { title: 'Express' });
};

exports.services = function(req, res){
  res.render('services', { title: 'Express' });
};

exports.about = function(req, res){
  res.render('about', { title: 'Express' });
};

exports.blogs = function(req, res){
  res.render('blogs', { title: 'Express' });
};