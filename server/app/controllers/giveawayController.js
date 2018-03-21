const mongoose = require("mongoose");
const _ = require('lodash');
const Giveaway = mongoose.model("Giveaway");
const Product = mongoose.model("Product");
const Route = mongoose.model("Route");

exports.saveRoute = function(req, res, next) {
	let route = req.body;
		
	new Route(req.body).save(function(err, route) {
		if (err) return next(err);

		res.send(route);
	})
}

exports.getAllGivaways = function(req, res, next) {
	Giveaway.find({})
			.populate('products')
			.exec(function(err, data) {
		if (err) return next(err);

		res.send(data);
	});
}

exports.getGiveawayById = function (req, res, next) {
	Giveaway.findById(req.params.id)
			.populate('products')
			.exec(function(err, data) {
		if (err) return next(err);

		res.send(data);
	});
}

exports.createGiveaway = function(req, res, next) {
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
		if (err) return next(err);

		res.send(giveaway);
	})
}

exports.addProductToGiveaway = function(req, res, next) {
	Giveaway.findById(req.params.id).exec(function (err, giveaway) {
		if (err) return next(err);

		let prod = req.body;
		prod.giveawayId = giveaway._id;

		new Product(prod).save(function (err, product) {
			if (err) return next(err);

			giveaway.products.push(product._id);						
			giveaway.save(function(err, updatedGiveaway) {
				if (err) return next(err);

				res.send(prod);				
			})
		})
	})	
}

exports.editGiveaway = function(req, res, next) {
	Giveaway.findById(req.params.id).exec(function (err, giveaway) {
		if (err) return next(err);

		// Setting up chnages
		Object.assign(giveaway, req.body);
		giveaway.save(function(err, updatedGiveaway) {
			if (err) return next(err);

			res.send(updatedGiveaway);
		})
	})
}

exports.editProductInGiveaway = function(req, res, next) {

}

exports.deleteProductFromGiveaway = function(req, res, next) {
	Giveaway.update({_id: req.params.giveawayId}, 
					{$pullAll: {_id: req.params.productId}}
				).exec(function (err, updatedGiveaway) {
					if (err) return next(err);

					res.send(updatedGiveaway);
				})
}

exports.deleteGiveaway = function(req, res, next) {
	Giveaway.deleteOne({_id: req.params.id}).exec(function(err) {
		if (err) return next(err);
		res.sendStatus(200)
	})
}

exports.associationTakesProduct = function(req, res, next) {

}