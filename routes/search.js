var express = require("express");
var router = express.Router();
var UserCredentials = require("../lib/UserCredentials"),
    UserProfile = require("../lib/UserProfile");

// Getting the search page
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Search' });
});
    
    /*TODO:
    -- display the search page.
    -- allow searching for mentors using username | actual name and possibily specialist.
    -- display the search results in a table
    */

module.exports = router;