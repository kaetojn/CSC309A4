var express = require('express');
var router = express.Router();
var UserProfile = require("../lib/UserProfile");

/* GET search page. */
router.get('/', function(req, res, next) {
    res.render('search', { title: 'Search Page' });
});

router.get('/mentorlist', function(req, res) {

    console.log("Getting mentorlist from DB");

    // test data

    mentor1 = {
        username: 'c3mohamn',
        firstname: 'Nasir',
        lastname: 'Mohammad',
        specialties: 'Math',
        description: 'I like turtles',
        age: '22',
        location: 'Toronto',
        education: 'University of Toronto',
        degree: 'Math'
    }
    mentor2 = {
        username: 'c2mohamn',
        firstname: 'Nasir',
        lastname: 'Mohammad',
        specialties: 'Math',
        description: 'I like turtles',
        age: '22',
        location: 'Toronto',
        education: 'University of Toronto',
        degree: 'Math'
    }
    mentor3 = {
        username: 'c1mohamn',
        firstname: 'Nasir',
        lastname: 'Mohammad',
        specialties: 'Math',
        description: 'I like turtles',
        age: '22',
        location: 'Toronto',
        education: 'University of Toronto',
        degree: 'Math'
    }

    var mentorlist = [mentor1, mentor2, mentor3];
    res.json(mentorlist);

});


module.exports = router;
