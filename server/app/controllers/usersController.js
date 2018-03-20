const mongoose = require("mongoose");
const _ = require('lodash');
const User = mongoose.model("User");

exports.getAllUsers = function(req, res, next) {
    User.find({}).exec(function(err, data) {
        if (err) return next(err);
        
        res.send(data);
    });
}

exports.getVolunteers = function(req, res, next){

}

exports.getDonors = function(req, res,next) {

}

exports.getUserById = function(req, res, next) {

}

exports.addUser = function(req, res, next) {
    user = new User(req.body); 
    user.save(function(err, user) {
		if (err) return next(err);

		res.send(user);
	});
}

exports.updateUser = function(req, res, next) {

}

exports.deleteUser = function(req, res, next) {

}