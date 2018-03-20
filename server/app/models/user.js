const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commonModels = require('./commonModels');
const AddressSchema = commonModels.AddressSchema;
const LocationSchema = commonModels.LocationSchema;

const  UserSchema = new Schema({
	authId: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: String,
	imageUrl: String,
	level: {type: String, default: 'STARTER'},
	rank: Number,
	phone: {type: String, required: true},
	address: AddressSchema,
	isVolunteer: {type: Boolean, required:true}
}, {collection: 'users'})

mongoose.model("User", UserSchema);