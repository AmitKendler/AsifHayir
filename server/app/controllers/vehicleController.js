var _ = require('lodash');
const mongoose = require("mongoose");
const Vehicle = mongoose.model("Vehicle");

exports.getAll = function(req, res) {
	Vehicle.find({}).exec(function (err, data) {
		if (err) throw err;

		res.send(data);
	})
};

exports.getById = function(req, res) {
	let vehicleId = req.params.id;
	Vehicle.find({_id: vehicleId}).exec(function (err, data) {
		if (err) throw err;

		res.send(data);
	});
}

exports.create = function(req, res) {
	new Vehicle(req.body).save(function (err, vehicle) {
		if (err) throw err;

		res.send(vehicle);
	})
}