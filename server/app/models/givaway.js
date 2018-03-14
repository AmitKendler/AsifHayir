const commonModels = require('./commonModels');
const TimePeriodSchema = commonModels.TimePeriodSchema;
const ContactSchema = commonModels.ContactSchema;
const PickupAddressSchema = commonModels.AdderssSchema;
const AddressSchema = commonModels.AdderssSchema;
const ProductSchema = require('./product');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Giveaway = new Schema({
	userId: {type: Schema.Types.ObjectId, required: true},
	title: {type: String, required: true},
	description: String,
	address: {type: AddressSchema, required: true},
	pickupTime: TimePeriodSchema,
	contact: ContactSchema,
	products: [ProductSchema],
	status: {type: String, required: true}
}, {collection: 'givaways'})

mongoose.model("Giveaway", Giveaway);