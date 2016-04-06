var express = require('express');
var router = express.Router();
var UserProfile = require("../lib/UserProfile");

/* GET search page. */
router.get('/', function(req, res, next) {
    res.render('search', { title: 'Search Page' });
});

router.get('/mentorlist', function(req, res) {

    console.log("Getting mentorlist from DB");

    res.json(mentorlist);
    UserProfile.find({username: 'c3mohamn'}, function(err, results){
        if (err) throw err;
        console.log(results);
        res.json(results);

    });
});


module.exports = router;
