const mongoose = require("mongoose");
const _ = require('lodash');
const Giveaway = mongoose.model("Giveaway");
const Product = mongoose.model("Product");

exports.getAllGivaways = function(req, res) {
	Giveaway.find({}).exec(function(err, data) {
		if (err) throw err;

		res.send(data);
	});
}

exports.getGiveawayById = function (req, res) {
	Giveaway.findById(req.params.id).exec(function(err, data) {
		if (err) throw err;

		res.send(data);
	});
}

exports.createGiveaway = function(req, res) {
	let giveaway = req.body;
	
	// Converting to ObjectId id needed - for testing
	if (typeof(giveaway.userId) !== mongoose.Schema.Types.ObjectId) {
		try {
			giveaway.userId =  mongoose.Types.ObjectId(giveaway.userId);
		} catch (e) {
			console.log(e);
			giveaway.userId = mongoose.Types.ObjectId();
		}
	}
	
	new Giveaway(req.body).save(function(err, giveaway) {
		if (err) throw err;

		res.send(giveaway);
	})
}

exports.addProductToGiveaway = function(req, res) {
	Giveaway.findById(req.params.id).exec(function (err, giveaway) {
		if (err) throw err;

		let prod = req.body;
		prod.giveawayId = giveaway._id;

		new Product(prod).save(function (err, product) {
			if (err) throw err;

			giveaway.products.push(product._id);						
			giveaway.save(function(err, updatedGiveaway) {
				if (err) throw res;

				res.send(prod);				
			})
		})
	})	
}

exports.editGiveaway = function(req, res) {
	Giveaway.findById(req.params.id).exec(function (err, giveaway) {
		if (err) throw err;

		// Setting up chnages
		Object.assign(giveaway, req.body);
		giveaway.save(function(err, updatedGiveaway) {
			if (err) throw err;

			res.send(updatedGiveaway);
		})
	})
}

exports.editProductInGiveaway = function(req, res) {

}

exports.deleteProductFromGiveaway = function(req, res) {
	Giveaway.update({_id: req.params.giveawayId}, 
					{$pullAll: {_id: req.params.productId}}
				).exec(function (err, updatedGiveaway) {
					if (err) throw err;

					res.send(updatedGiveaway);
				})
}

exports.deleteGiveaway = function(req, res) {
	Giveaway.deleteOne({_id: req.params.id}).exec(function(err) {
		if (err) throw err;
		res.sendStatus(200)
	})
}

exports.associationTakesProduct = function(req, res) {

}