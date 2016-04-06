var express = require('express');
var UserProfile = require("../lib/UserProfile");
var UserCredentials = require("../lib/UserCredentials");
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'admin page' });
});

// get all users
router.get('/users', function(req, res){
	UserProfile.find({} , function(err, users) {
 		if (err) throw err;
  		res.json(users);
	});
});

//update user's password
router.post('/:id', function(req, res){
    var _username= req.body.username;
    var new_password = req.body.password;

    UserCredentials.findOneAndUpdate({ username: _username}, {password: new_password},function(err, user) {
  		if (err) throw err;

  		// we have the updated user returned to us
  		console.log(user);
	});
});

// search 1 user
router.get('/searchuser', function(req, res){
  //var _username= req.body.username;
    var id = req.params._id;
    console.log(id);
    return res.send(id);
  UserProfile.find({_id: req.params.id}, function(err, user){
    if (err) {
      return res.send(err);
    }

      res.json(user);
    });
});

//create user
router.route('/createuser').post(function(req, res) {
  var newuser = new UserCredentials(req.body);

  newuser.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.send({ message: 'New User Created'});
  });
});

//delete user
router.route('/deleteuser').delete(function(req, res) {
  UserCredentials.remove({
  	//id or username
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;

