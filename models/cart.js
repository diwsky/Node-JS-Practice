const path = require("path")

const p = path.join(path.dirname(require.main.filename), "data", "cart.json")
const fs = require("fs")

module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(p, (err, file) => {
			// initiate temp cart
			let cart = { products: [], totalPrice: 0 }
			if (!err) {
				cart = JSON.parse(file)
			}

			const existingProductIndex = cart.products.findIndex(
				prod => prod.id === id
			)
			const existingProduct = cart.products[existingProductIndex]

			let updatedProduct

			if (existingProduct) {
				updatedProduct = { ...existingProduct }
				updatedProduct.qty = updatedProduct.qty + 1
				cart.products = [...cart.products]
				cart.products[existingProductIndex] = updatedProduct
			} else {
				updatedProduct = { id: id, qty: 1 }
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = cart.totalPrice + +productPrice
			cart.products = [...cart.products]

			fs.writeFile(p, JSON.stringify(cart), err => {
				console.log(err)
			})
		})
	}

	static deleteProductCart(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return
			}
			const cart = JSON.parse(fileContent)

			const updatedCart = { ...cart }
			const product = updatedCart.products.find(prod => prod.id === id)
			const productQty = product.qty

			updatedCart.products = updatedCart.products.filter(
				product => product.id !== id
			)
			updatedCart.totalPrice = cart.totalPrice - productQty * productPrice

			fs.writeFile(p, JSON.stringify(updatedCart), err => {
				console.log(err)
			})
		})
	}

	static getCart(cb) {
		fs.readFile(p, (err, fileContent) => {
			const cart = JSON.parse(fileContent)

			if (err) {
				cb(null)
			} else {
				cb(cart)
			}
		})
	}
}
