const Cart = require("../models/cart")
const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			})
		})
		.catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId

	Product.findByPk(prodId)
		.then(product => {
			res.render(`shop/product-detail`, {
				product: product,
				pageTitle: product.pageTitle,
				path: "/products",
			})
		})
		.catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			})
		})
		.catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then(cart => {
			cart
				.getProducts()
				.then(products => {
					res.render("shop/cart", {
						path: "/cart",
						pageTitle: "Your Cart",
						products: products,
					})
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId
	let fetchedCart
	let newQuantity = 1

	req.user
		.getCart()
		.then(cart => {
			fetchedCart = cart
			fetchedCart
				.getProducts({ where: { id: prodId } })
				.then(products => {
					let product

					if (products.length > 0) {
						product = products[0]
					}

					// if there is an existing product in the cart
					if (product) {
						let oldQuantity = product.cartItem.quantity
						newQuantity = oldQuantity + 1
						return product
					}

					// if there is no existing product in the cart
					return Product.findByPk(prodId)
				})
				.then(product => {
					return fetchedCart.addProduct(product, {
						through: { quantity: newQuantity },
					})
				})
				.catch(err => console.log(err))
		})
		.then(_ => {
			res.redirect("/cart")
		})
		.catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
	})
}

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId

	req.user
		.getCart()
		.then(cart => {
			return cart.getProducts({ where: { id: prodId } })
		})
		.then(products => {
			let product = products[0]

			return product.cartItem.destroy()
		})
		.then(_ => {
			res.redirect("/cart")
		})
		.catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	})
}
