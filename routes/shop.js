const path = require("path")
const rootDir = require("../util/path")
const express = require("express")

const routes = express.Router()

routes.get("/", (req, res, next) => {
	res.sendFile(path.join(rootDir, "views", "shop.html"))
})

module.exports = routes
