const jwt = require("jsonwebtoken")
require("dotenv").config()


const generateAccessToken = (userId) => {
	const payload = {
		userId: userId
	}

	const options = {
		expiresIn: process.env.JWT_EXPIRY
	}

	return jwt.sign(payload, process.env.JWT_SECRET, options)
}

const generateRefreshToken = (userId) => {
	const payload = {
		userId: userId
	}

	const options = {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRY
	}

	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options)
}
module.exports = { generateAccessToken, generateRefreshToken };