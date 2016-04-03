var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: String,
    admin: Boolean,
    firstname: String,
    lastname: String,
    specialties: [],
    description: String,
    created_at: Date,
    mentors: [{username: String}],
    mentees: [{username: String}],
    reviews: [{username: String, review: String}]
});

var User = mongoose.model('myuser', userSchema);
module.exports = User;