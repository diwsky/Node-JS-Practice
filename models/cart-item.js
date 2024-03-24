const Sequelize = require("sequelize")
const db = require("../util/db")

const CartItem = db.define("cartItem", {
	id: {
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
	},
	quantity: {
		type: Sequelize.INTEGER,
	},
})

module.exports = CartItem
