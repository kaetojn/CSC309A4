var express = require('express');
var router = express.Router();
var UserCredentials = require("../lib/UserCredentials");
var UserProfile = require("../lib/UserProfile");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toronto Tutor' });
});


//POST to log in
router.post('/login', function(req, res){
    var u = req.body.username;
    var p = req.body.password;
    console.log(req.body);
    UserCredentials.findOne({username: u, password: p}, function(err, user){
       if(err){
           console.log(err);
           return res.status(500).send();
       }
       console.log(user);
        if(!user){
            return res.status(404).send();
        }
        req.session.user = user;
        res.redirect("/dashboard");
        return res.status(200).send();
    });
});


router.get('/dashboard', function(req, res){
   if(!req.session.user){
       return res.status(401).send();
   }
    res.render("profile");
    return res.status(200);
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
    var age = req.body.age;
    var location = req.body.location;
    var education = req.body.education;
    var degree = req.body.degree;

    var newProfile = new UserProfile();
    newProfile.username = username;
    newProfile.firstname = firstname;
    newProfile.lastname = lastname;
    newProfile.specialties = specialty;
    newProfile.description = description;
    newProfile.age = age;
    newProfile.location = location;
    newProfile.education = education;
    newProfile.degree = degree;

    console.log(newProfile);

    newProfile.save(function(err, savedProfile) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            res.redirect("/dashboard");
            return res.status(200).send();
        }
    });
});

router.get("/UserProfile/:userID", function(req, res) {
    UserProfile.findById(req.params.userID, function(err, user) {
        if (user) {
            return res.status(200).send(user);
        }
    });
    return res.status(200).send("Blah Blahson");
});

module.exports = router;
