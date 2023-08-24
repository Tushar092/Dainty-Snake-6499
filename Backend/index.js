const express = require("express")
const app = express()
const userRoute = require("./routes/user.route")
const passport = require("./config/google_oauth");
require('dotenv').config()
app.use(express.json())
const { connection } = require("./config/db")

// app.use(cookieParser())


app.use("/user", userRoute)

app.get("/", (req, res) => {
	try {
		res.send({ res: "Home Page" });
	} catch (error) {
		res.send({ err: error.message })
	}
})

app.get('/auth/google',
	passport.authenticate('google', { scope: ['profile', "email"] }));

app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/login', session: false }),
	function (req, res) {
		// Successful authentication, redirect home.
		console.log(req.user)
		res.redirect('/');
	});

app.listen(process.env.port, async () => {
	try {
		console.log(`App is running on port ${process.env.port}`)
		await connection
		console.log("DB COnnected");
	} catch (error) {
		console.error(error)
	}
})