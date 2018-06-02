const mongoose = require("mongoose");
const _ = require("lodash");
const Giveaway = mongoose.model("Giveaway");
const Product = mongoose.model("Product");
const Route = mongoose.model("Route");

exports.saveRoute = function(req, res, next) {
	let route = req.body;

	new Route(req.body).save(function(err, route) {
		if (err) return next(err);

		res.send(route);
	});
};

exports.getAllGivaways = function(req, res, next) {
	Giveaway.find({}).populate("products").exec(function(err, data) {
		if (err) return next(err);

		res.send(data);
	});
};

exports.getGiveawaysByIds = function(req, res, next) {
	let ids = req.body;

	let mongoIds = [];
	mongoIds = ids.map(id => mongoose.Types.ObjectId(id));

	Giveaway.find()
		.where('_id')
  	    .in(mongoIds)
		.populate("products")
		.exec(function(err, data) {
			if (err) return next(err);

			res.send(data);
		});
};

exports.getGiveawayById = function(req, res, next) {
	Giveaway.findById(req.params.id)
		.populate("products")
		.exec(function(err, data) {
			if (err) return next(err);

			res.send(data);
		});
};

exports.getGiveawaysByUser = function (req, res, next) {
	console.log("getting giveways..",req.params.userId);
	Giveaway.find({userId: mongoose.Types.ObjectId(req.params.userId)})
		.populate("products")
		.exec(function (err, data) {
			if (err) return next(err);
			console.log("giveaways found:",data);

			res.send(data);
		})
}

exports.createGiveaway = function(req, res, next) {
	let giveaway = req.body;

	// Converting to ObjectId id needed - for testing
	if (typeof giveaway.userId !== mongoose.Schema.Types.ObjectId) {
		try {
			giveaway.userId = mongoose.Types.ObjectId(giveaway.userId);
		} catch (e) {
			console.log(e);
			giveaway.userId = mongoose.Types.ObjectId();
		}
	}

	new Giveaway(req.body).save(function(err, giveaway) {
		if (err) return next(err);

		res.send(giveaway);
	});
};

exports.createGiveawayWithProducts = function(req, res, next) {
	let giveaway = req.body;

	// Converting to ObjectId id needed - for testing
	if (typeof giveaway.userId !== mongoose.Schema.Types.ObjectId) {
		try {
			giveaway.userId = mongoose.Types.ObjectId(giveaway.userId);
		} catch (e) {
			console.log(e);
			giveaway.userId = mongoose.Types.ObjectId();
		}
	}

	// Check if there's an embedded product object
	if (giveaway.products.length) {
		// Clone prodcts array to save for later
		let productsClone = giveaway.products.slice();

		// remove "bad" prodcts array..
		giveaway.products = [];

		new Giveaway(giveaway).save().then(function(savedGiveaway, err) {
			if (err) {
				console.log("error!", err);
				return next(err);
			}

			console.log("saved!", savedGiveaway);

			let productsPromises = [];

			// Go through each product, save it to the DB and then add it to the giveaway object
			productsClone.forEach(function(prod) {
				prod.giveawayId = savedGiveaway._id;

				console.log("saving product..", prod);
				productsPromises.push(new Product(prod).save());
			});

			Promise.all(productsPromises).then(function(prodArray, err) {
				if (err) return next(err);

				prodArray.forEach(function(prod) {
					savedGiveaway.products.push(prod._id);
				});

				savedGiveaway.save(function(err, updatedGiveaway) {
					if (err) return next(err);
					res.send(updatedGiveaway);
				});
			});
			//	res.send(giveaway);
		});
	}
};

exports.addProductToGiveaway = function(req, res, next) {
	Giveaway.findById(req.params.id).exec(function(err, giveaway) {
		if (err) return next(err);

		let prod = req.body;
		prod.giveawayId = giveaway._id;

		new Product(prod).save(function(err, product) {
			if (err) return next(err);

			giveaway.products.push(product._id);
			giveaway.save(function(err, updatedGiveaway) {
				if (err) return next(err);

				res.send(prod);
			});
		});
	});
};

exports.editGiveaway = function(req, res, next) {
	Giveaway.findById(req.params.id).exec(function(err, giveaway) {
		if (err) return next(err);

		// Setting up chnages
		Object.assign(giveaway, req.body);
		giveaway.save(function(err, updatedGiveaway) {
			if (err) return next(err);

			res.send(updatedGiveaway);
		});
	});
};

exports.editProductInGiveaway = function editProductInGiveaway(req, res, next) {
	Product.findById(req.params.productId).exec(function(err, product) {
		if (err) return next(err);

		// Setting up chnages
		Object.assign(product, req.body);
		product.save(function(err, updatedProduct) {
			if (err) return next(err);

			res.send(updatedProduct);
		});
	});
};

exports.changeProductsStatus = function (req, res, next) {
	let productIds = req.body.productIds;
	let status = req.body.status;

	Product.find()
			.where('id').in(productIds)
			.exec(function (findErr, products) {
				if (findErr) throw findErr;
				let promises = [];
				products.forEach(function (product){
					product.status = status;
					promises.push(product.save());
				});

				Promise.all(promises).then(function (saveErr, updatedProducts) {
					if (saveErr) throw saveErr;

					res.send(updatedProducts);
				})
			})
}

exports.deleteProductFromGiveaway = function(req, res, next) {
	Giveaway.update(
		{ _id: req.params.giveawayId },
		{ $pullAll: { _id: req.params.productId } }
	).exec(function(err, updatedGiveaway) {
		if (err) return next(err);

		res.send(updatedGiveaway);
	});
};

exports.deleteGiveaway = function(req, res, next) {
	Giveaway.deleteOne({ _id: req.params.id }).exec(function(err) {
		if (err) return next(err);
		res.sendStatus(200);
	});
};

exports.associationTakesProduct = function(req, res, next) {};
