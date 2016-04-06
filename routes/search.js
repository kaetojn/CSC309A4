/* TEMP FILE, WILL BE DELETED ONCE ADDED TO INDEX. */

// TODO: Add a search bar on the profile page

// Search starts when a user enters something into a search bar.

//POST to search
router.post('/search', function(req, res){    
    var search = req.body.search;
    
    // find the user that matches search
    // Atm will only be searching using username
    UserProfile.findOne({username: search}, function(err, user){
       if(err){
           console.log(err);
           return res.status(500).send();
       }
       if(!user){
           return res.status(404).send();
       }
    });
});

// Will redirect user to a new page, where mentors that match their results will be posted.
