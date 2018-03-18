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

exports.update = function(req,res) {
    let vehicleId = req.params.id;
    Vehicle.findByIdAndUpdate(vehicleId, req.body, {new: true}).exec(function (err,vehicle) {
        if (err) throw err;

        res.send(vehicle);
    })
}

exports.delete = function(req, res) {
    let vehicleId = req.params.id;
    Vehicle.findByIdAndRemove(vehicleId).exec(function (err, vehicle){
        if(err) throw err;

        const response = {
            message: "vehicle successfully deleted",
            id: vehicle._id
        }

        res.send(response);
    })
}
