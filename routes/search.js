var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('search', { title: 'Search Tutors' });
});

module.exports = router;
