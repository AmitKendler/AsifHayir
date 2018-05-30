const mongoose = require("mongoose");
const _ = require("lodash");
const User = mongoose.model("User");

exports.login = function(req, res, next) {
    console.log("logging in..", req.body.token);
    User.find({ authId: req.body.token }).exec(function(err, data) {
        if (err) return next(err);

        res.send(data);
    });
};

exports.getAllUsers = function(req, res, next) {
    User.find({}).exec(function(err, data) {
        if (err) return next(err);

        res.send(data);
    });
};

exports.getVolunteers = function(req, res, next) {
    User.find({ isVolunteer: true }).exec(function(err, data) {
        if (err) return next(err);

        res.send(data);
    });
};

exports.getDonors = function(req, res, next) {
    User.find({ isVolunteer: false }).exec(function(err, data) {
        if (err) return next(err);

        res.send(data);
    });
};

exports.getUserById = function(req, res, next) {
    User.findById(req.params.id).exec(function(err, user) {
        if (err) return next(err);

        res.send(user);
    });
};

exports.addUser = function(req, res, next) {
    new User(req.body).save(function(err, user) {
        if (err) return next(err);

        res.send(user);
    });
};

exports.updateUser = function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec(function(err, user) {
        if (err) return next(err);

        res.send(user);
    });
};

exports.deleteUser = function(req, res, next) {
    User.findByIdAndRemove(req.params.id).exec(function(err, user) {
        if (err) return next(err);

        res.sendStatus(200);
    });
};
