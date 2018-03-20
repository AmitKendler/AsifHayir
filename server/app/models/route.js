const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Route = new Schema({
	date: Date,
	paths: Schema.Types.Mixed
}, {collection: 'routes'})

mongoose.model("Route", Route);