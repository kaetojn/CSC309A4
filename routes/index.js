var express = require('express');
var router = express.Router();
var UserCredentials = require("../lib/UserCredentials"),
    UserProfile = require("../lib/UserProfile");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toronto Tutor' });
});


//POST to log in
router.post('/login', function(req, res){
    var username= req.body.username;
    var password = req.body.password;
    
    UserProfile.findOne({username: username, password: password}, function(err, user){
       if(err){
           console.log(err);
           return res.status(500).send();
       }
        if(!user){
            return res.status(404).send();
        }
        req.session.user = user;
        return res.status(200).send();
    });
});


router.get('/dashboard', function(req, res){
   if(!req.session.user){
       return res.status(401).send();
   }
    return res.status(200).send("Welcome to Toronto Toronto Tutor");
});

//GET to Log out
router.get('/logout', function(req, res){
    req.session.destroy();
    return res.status(200).send();
});

//POST to Sign Up
router.post('/register', function(req, res){    
    var username= req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    // create a new user and add his credentials to the database
    var newUser = new UserCredentials();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    
    // save the user's credentials
    newUser.save(function(err, savedUser) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            req.session.user = savedUser;
            res.render("update-profile");
            return res.status(200).send();
        }
    });
});

router.post("/update-profile", function(req, res) {
    if (!req.session.user) {
        return res.status(401).send();
    } 
    var username = req.session.user.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var specialty = req.body.specialty;  // TODO support multiple specialties
    var description = req.body.description;

    var newProfile = new UserProfile();
    newProfile.username = username;
    newProfile.firstname = firstname;
    newProfile.lastname = lastname;
    newProfile.specialties.push(specialty);
    newProfile.description = description;

    newProfile.save(function(err, savedProfile) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    });
});

module.exports = router;
