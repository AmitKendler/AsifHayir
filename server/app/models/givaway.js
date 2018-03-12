import { TimePeriodSchema, ContactSchema } from "./commonModels";
import { ProductSchema } from "./product";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Givaway = new Schema({
	title: {type: String, required: true},
	description: String,
	address: {type: String, required: true},
	availability: TimePeriodSchema,
	contact: ContactSchema,
	products: [ProductSchema],
	status: {type: String, required: true}
}, {collection: 'givaways'})