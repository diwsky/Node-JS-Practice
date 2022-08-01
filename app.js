const http = require("http")

const express = require("express")

const app = express()

app.use((req, res, next) => {
	console.log("In the middleware!")
	next()
})

app.use((req, res, next) => {
	console.log("duaa")
	res.send("<h1>Hello express</h1>")
})

const server = http.createServer(app)

server.listen(3000)
