var mongoose = require("mongoose");

// TODO Hash the password
var UserCredentials = mongoose.model("usercredentials", new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: String,
    admin: Boolean,
    created_at: Date
}));

module.exports = UserCredentials;
