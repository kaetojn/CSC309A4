var express = require('express');
var router = express.Router();
var User = require('../lib/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toronto Tutor' });
});


//POST to log in
router.post('/login', function(req, res){
    var username= req.body.username;
    var password = req.body.password;
    
    User.findOne({username: username, password: password}, function(err, user){
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
    
    //create a new user
    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.email = email;

    //save the user
    newuser.save(function(err, savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }else{
            return res.status(200).send();
        }
    });   
});

module.exports = router;
