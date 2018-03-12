import { Schema } from "mongoose";

exports.TimePeriodSchema = new Schema({
	startTime: Date,
	endTime: Date
});

exports.ContactSchema = new Schema({
	name: {type: String, required:true},
	phone: {type: String, required: true}
});

exports.ProductAmountSchema = new Schema({
	amount: {type: Number, required: true},
	units: {type: String, required: true}
})