'use strict';

function Store(product, variant, option) {

	this.getAllProducts = function(req, res) {
		product.findAll({
			include: [{
				model: variant,
				include: [{
					model: option
				}]
			}]
		})
		.then(function (prds) {
			if (!prds) {
				req.msg = "No products in database!";
				return res.json({
					success: false,
					msg: req.msg
				});
			}
			else {
				sendProductToClient(prds, "Products loaded successfully.", res);
			}
		})
		.catch(function(err){
			console.log("Error: ", err);												
		});
	}

	this.getOneProduct = function(req, res) {
		product.findOne({
			where: {id: req.params.id},
			include: [{
				model: variant,
				include: [{
					model: option
				}]
			}]
    	})
    	.then(function(prd) {
			if (!prd){
				req.msg = "No such product in database!";
				return res.json({
					success: false,
					msg: req.msg
				});
			}
			else{
				sendProductToClient(prd, "Product found.", res);
			}
		})
		.catch(function(err){
			console.log("Error: ", err);
		});

	}

	function sendProductToClient(prd, msg, res){
	  return res.json({ success: true,
	                    msg: msg,
	                    product: prd
	                  });
	}

}

module.exports = Store;
