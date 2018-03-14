const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vehicle = new Schema({
	number: {type: String, required: true},
	type: {type: String},
}, {collection: 'vehicles'})