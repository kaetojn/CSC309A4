var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var usersSchema = new Schema({
	username: {
		type: String,
		required: true
		min: [6, 'Minimum 6 characters'],
		max: 50
	},
	password: {
		type: String,
		required: true,
		min: [6, 'Minimum 6 character'],
		max: 20,
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: [validateEmail, 'Not a valid email address'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a valid email address']
		}
	}
	phone: {
		type: String,
		validate: {
			validator: function(v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
			},
				message: '{VALUE} is not a valid phone number!'
			},
				required: false
	}
	location: {
		type: String,
		required: true
	},
	specialties: {
		type: [String],
		required: true
	}
	education: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	mentors:{
		type: [Schema.ObjectId],
		ref: 'users'	
	},
	mentees:{
		type: [Schema.ObjectId],
		ref: 'users'	
	}
	reviews: {
		type: [Schema.ObjectId],
		ref: 'reviews' 
	}
});

var reviewsSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	}
	review_desc:{
		type: String,
		required: false
	}
});

mongoose.model('reviews', reviewsSchema);
//mongoose.model('users', usersSchema);
var User = mongoose.model('myuser', usersSchema);
module.exports = User;
