const mongoose = require("mongoose");
const Giveaway = mongoose.model("Giveaway");

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
	new Giveaway(req.body).save(function(err, giveaway) {
		if (err) throw err;

		res.send(giveaway)
	})
}

exports.addProductToGiveaway = function(req, res) {

}

exports.editGiveaway = function(req, res) {

}

exports.editProductInGiveaway = function(req, res) {

}

exports.deleteProductFromGiveaway = function(req, res) {

}

exports.deleteGiveaway = function(req, res) {

}

exports.associationTakesProduct = function(req, res) {

}