var mongoose = require("mongoose");

var UserProfile = mongoose.model("userprofile", new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstname: String,
    lastname: String,
    specialties: [],
    description, String,
    mentors: [{username: String}],
    mentees: [{username: String}],
    reviews: [{username: String, review: String}]
}));

module.exports = UserProfile;
