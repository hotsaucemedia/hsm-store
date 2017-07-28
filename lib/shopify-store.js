'use strict';

function Shopify() {
 	
	var buy = require('shopify-buy');

	var shopClient = buy.buildClient({
		accessToken: '9791307178fcd7efe28a39f615d43987',
		domain: 'hot-sauce-media.myshopify.com',
		appId: '6'
	});

	this.getAllProducts = function(req, res) {
		shopClient.fetchAllProducts()
			.then(function(data) {
				let products = [];

				data.forEach(function(datum) {
					products.push(translate(datum));
        		});

				// Send data client
				sendProductToClient(products, 'All products', res);
      		})
      		.catch(function(err) {
        		console.log('Error: ' + err);
			});
	}

	this.getOneProduct = function(req, res) {
		shopClient.fetchProduct(req.params.id)
			.then(function(data) {
				let product = translate(data);
				sendProductToClient(product, 'One product', res);
			})
      		.catch(function(err) {
        		console.log('Error: ' + err);
			});
	}

	// Shopify cart methods perhaps unnecessary
	// May be able to use the default cart

	this.createCart = function() {
		shopClient.createCart()
			.then(function(data) {
				console.log(data);
			})
      		.catch(function(err) {
        		console.log('Error: ' + err);
			});
	}
	

	this.addToCart = function(product, cart) {
		cart.createLineItemsFromVariants({
			variant: product.selectedVariant,
			quantity: 1
		});
	}

	this.setQuantity = function(cart, item, quantity) {
		cart.updateLineItem(item.id, quantity);
	}

	function translate(data) {
			let product = {};

			product.name = data.attrs.title;
			product.desc = data.attrs.body_html;
			product.available = data.attrs.available;
			product.id = data.attrs.product_id;
			product.image = data.attrs.images[0].src;
			product.thumb = ""; // to do
			product.price = ""; // to do

			product.variants = [];

			data.attrs.options.forEach(function(o) {
				let variant = {};

					variant.name = o.name;
				variant.id = o.id;

				variant.options = [];

				data.attrs.variants.forEach(function(v) {
					let option = {};
					option.id = v.id;
					option.name = v.title;
					option.available = v.available;
					option.price = v.price;
					option.image = ""; // to do
					option.thumb = ""; // to do

					variant.options.push(option);
				});

				product.variants.push(variant);

			});

			return product;
	}

	function sendProductToClient(product, msg, res){
	  return res.json({ success: true,
	                    msg: msg,
	                    product: product
	                  });
	}

}

module.exports = new Shopify();
