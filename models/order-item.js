const Sequelize = require("sequelize").Sequelize
const db = require("../util/db")

const OrderItem = db.define("orderItem", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	quantity: Sequelize.INTEGER,
})

module.exports = OrderItem
