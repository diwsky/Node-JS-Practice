const Sequelize = require("sequelize").Sequelize
const db = require("../util/db")

const Cart = db.define("cart", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
})

module.exports = Cart
