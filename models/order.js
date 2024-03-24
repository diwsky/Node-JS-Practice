const Sequelize = require("sequelize").Sequelize
const db = require("../util/db")

const Order = db.define("order", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
})

module.exports = Order
