var express = require("express");
var router = express.Router();
var UserCredentials = require("../lib/UserCredentials"),
    UserProfile = require("../lib/UserProfile");

/* GET update profile page */
router.get("/register", function(req, res, next) {
    res.render("update-profile");
});

router.post("/update", function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var description = req.body.description;
    var specialty = req.body.specialty;

    // XXX ALL OF THE CODE BELOW MAY NOT WORK
    if (!req.session.user) {
        return res.status(401).send();
    }
    
    // create a new profile for the logged in user
    var newProfile = new UserProfile();
    newProfile.username = req.session.user.username;
    newProfile.firstname = firstname;
    newProfile.lastname = lastname;
    newProfile.description = description;
    newProfile.specialty = specialty;

    // save the profile
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
