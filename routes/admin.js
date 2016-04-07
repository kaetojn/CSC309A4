var express = require('express');
var UserProfile = require("../lib/UserProfile");
var UserCredentials = require("../lib/UserCredentials");
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'admin page' });
});

// get all users
/*
router.get('/users', function(req, res){
	UserProfile.find({} , function(err, users) {
 		if (err) throw err;
  		res.json(users);
	});
});
*/

// search 1 user
router.get('/searchuser', function(req, res){
  UserCredentials.findOne({_id: req.params.id}, function(err, user){
    if (err) {
      return res.send(err);
    }
    console.log(user);
    res.json(user);
    });
});

//update user's password
router.put('/update/:id', function(req, res){
    var _username= req.body.username;
    var new_password = req.body.password;

    UserProfile.findOneAndUpdate({ username: _username}, {password: new_password},function(err, user) {
  		if (err) throw err;

  		// we have the updated user returned to us
  		console.log(user);
	});
});

//create user
/*
router.post('/createuser', function(req, res) {
  var newuser = new UserProfile(req.body);

  newuser.save(function(err) {
    if (err) {
      return res.send(err);
    }
    console.log("new user created");
    //res.send({ message: 'New User Created'});
  });
});
*/

//delete user
router.route('/deleteuser/:id').delete(function(req, res) {
  UserProfile.remove({
  	//id or username
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});








router.route('/users')
  .get(function(req, res) {
    UserCredentials.find(function(err, users) {
      if (err) {
        return res.send(err);
      }

      res.json(users);
    });
  })
  .post(function(req, res) {
    var user = new UserCredentials(req.body);

 //   user.username = req.body.username;
//    user.password = req.body.password;
 //   user.em

    console.log(req.body);
    user.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Movie Added' });
    });
  });






module.exports = router;

