var express = require('express');
var UserProfile = require("../lib/UserProfile");
var router = express.Router();

router.get('/admin', function(req, res, next){
	res.render('index');
	return res.status(200).send();
});

module.exports = router;
