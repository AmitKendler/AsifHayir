const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Route = new Schema({
	date: Date,
}, {collection: 'routes'}, { strict: false })

mongoose.model("Route", Route);