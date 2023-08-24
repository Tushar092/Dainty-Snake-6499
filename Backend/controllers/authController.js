const bcrypt = require("bcrypt")
const { User } = require("../models/user.model")
const jwt = require("../config/jwt")
const blacklist = require("../config/blacklist")


const signup = async (req, res) => {

	try {

		const { name, email, password, } = req.body

		const existingUSer = await User.findOne({ email });

		if (existingUSer) {
			return res.status(400).send({ msg: "Email is already exist" })
		}

		const hashedPassword = await bcrypt.hash(password, 8)

		const newUser = new User({ name, email, password: hashedPassword, })
		await newUser.save()
		res.status(200).send({ msg: "User Created Successfully" })

	} catch (error) {
		res.send({ msg: "Internal Error from signup" })
	}

}


const login = async (req, res) => {

	try {
		const { email, password } = req.body

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).send({ msg: "email not exist" })
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(400).send({ msg: "Wrong Password" })
		}

		const accessToken = jwt.generateAccessToken(user._id)
		const refreshToken = jwt.generateRefreshToken(user._id)

		// console.log(accessToken,refreshToken)
		// res.cookie('accessToken',accessToken)
		res.cookie('refreshToken', refreshToken,)
		res.send({ accessToken, refreshToken })



	} catch (error) {
		console.log(error.message)
		res.status(500).send({ msg: "Internal Error from login" })
	}

}

const logout = async (req, res) => {

	try {

		const { accessToken, refreshToken } = req.cookies;
		blacklist.addToBlacklist(accessToken);
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')

		res.send({ msg: "Logout Successfully" })



	} catch (error) {
		res.status(500).send({ msg: "Internal Error from logout" }, error.message)
	}

}

module.exports = { signup, login, logout }