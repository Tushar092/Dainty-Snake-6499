const express = require("express")
const app = express()
require('dotenv').config()
app.use(express.json())
const { connection } = require("./config/db")

app.get("/", (req, res) => {
	try {
		res.send({ res: "Home Page" });
	} catch (error) {
		res.send({ err: error.message })
	}
})

app.listen(process.env.port, async () => {
	try {
		console.log(`App is running on port ${process.env.port}`)
		await connection
		console.log("DB COnnected");
	} catch (error) {
		console.error(error)
	}
})