'use strict';

function ShopifyBuy() {
 	
	var buy = require('shopify-buy');

	var shopClient = buy.buildClient({
		accessToken: '9791307178fcd7efe28a39f615d43987',
		domain: 'hot-sauce-media.myshopify.com',
		appId: '6'
	});

	this.fetchProducts = function() {
		return new Promise(function(resolve, reject) {
			shopClient.fetchAllProducts()
				.then(function(data) {
					resolve(data);
				});
		});
	}
	
	this.createCart = function() {
		return new Promise(function(resolve, reject) {
			shopClient.createCart()
				.then(function(data) {
					resolve(data);
				});
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
}

module.exports = new ShopifyBuy();
