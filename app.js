const http = require("http")
const fs = require("fs")

const { parse } = require("path")

const server = http.createServer((req, res) => {
	// console.log(req.url, req.headers, req.method)

	const method = req.method
	const url = req.url
	if (url === "/") {
		res.write("<html>")
		res.write("<head><title>Enter message</title></head>")
		res.write(
			"<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>SEND</button></form></head>"
		)
		res.write("</html>")
		return res.end()
	}

	if (url === "/message" && method === `POST`) {
		const body = []
		req.on("data", chunk => {
			console.log(chunk)
			body.push(chunk)
		})
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString()
			const msg = parsedBody.split("=")[1]
			fs.writeFile(`message.txt`, msg, err => {
				res.statusCode = 302
				res.setHeader("Location", "/")
				return res.end()
			})
		})
	}

	res.setHeader("Content-Type", "text/html")
	res.write("<html>")
	res.write("<head><title>My first page</title></head>")
	res.write("<body><h1>Hello from my node.js server!</h1></head>")
	res.write("</html>")
	res.end()
})

server.listen(3000)
