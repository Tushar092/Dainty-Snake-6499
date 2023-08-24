var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const { User } = require("../models/user.model");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:1010/auth/google/callback"
},
	async function (accessToken, refreshToken, profile, cb) {
		const user = new User({
			name: profile._json.given_name,
			email: profile._json.email,
			password: uuidv4()

		})

		await user.save();

		return cb(null, user);

		// console.log(profile);
	}
));
module.exports = passport;