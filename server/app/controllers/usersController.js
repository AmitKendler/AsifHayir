const mongoose = require("mongoose");
const _ = require('lodash');
const User = mongoose.model("User");

exports.login = function(req, res, next) {
    User.find({ authId: req.body.token }).exec(function(err, data) {
        if (err) next(err);

        res.send(data);
    })
}

exports.checkExists = function(req, res, next) {
    User.findOne({ authId: req.body.uid }).exec(function(err, user) {
        if (err) return next(err);

        if (user) {
            res.send(user);
        } else {
            res.send({ _id: null, info: "non existinguser" });
        }
    })
}

exports.updateUserInfo = function(req, res, next) {
    console.log("updaing user...");
    User.findOne({ "_id": req.body.userId }).exec(function(err, user) {
        if (err) return next(err);
        if (user && req.body.address && req.body.phone) {
            user.address = req.body.address;
            user.phone = req.body.phone;
            user.save(function(err, user) {
                if (err) return next(err);
                res.send(user);
            });
        }
    });
}

exports.postLogin = function(req, res, next) {
    User.find({ authId: req.body.authId }).exec(function(err, data) {
        if (err) next(err);
        console.log("login data " + data);
        if (!data.length) {
            console.log("unexisting user..creating");
            new User(req.body).save(function(err, user) {
                if (err) next(err);

                res.send(user);
            });
        } else {
            res.send(data[0]);
        }
        console.log("logging in..", data);
    });
}

exports.addPushTokenToUser = function(req, res, next) {
    User.findOne({ "_id": req.body.userId }).exec(function(err, user) {
        if (err) next(err);
        if (user) {
            user.pushNotificationToken = req.body.token
            user.save(function(err, user) {
                if (err) next(err);
                console.log("success! added push token");
                res.send(user);
            });
        }
    });
}

exports.getAllUsers = function(req, res, next) {
    User.find({}).exec(function(err, data) {
        if (err) next(err);

        res.send(data);
    });
}

exports.getVolunteers = function(req, res, next) {
    User.find({ isVolunteer: true }).exec(function(err, data) {
        if (err) next(err);

        res.send(data);
    });
}

exports.getDonors = function(req, res, next) {
    User.find({ isVolunteer: false }).exec(function(err, data) {
        if (err) next(err);

        res.send(data);
    });
}

exports.getUserById = function(req, res, next) {
    User.findById(req.params.id).exec(function(err, user) {
        if (err) next(err);

        res.send(user);
    });
}

exports.addUser = function(req, res, next) {
    new User(req.body).save(function(err, user) {
        if (err) next(err);

        res.send(user);
    });
}

exports.updateUser = function(req, res, next) {
    User.findByIdAndUpdate(req.params.id,
        req.body, { new: true }).exec(function(err, user) {
        if (err) next(err);

        res.send(user);
    });
}

exports.deleteUser = function(req, res, next) {
    User.findByIdAndRemove(req.params.id).exec(function(err, user) {
        if (err) next(err);

        res.sendStatus(200);
    });
}