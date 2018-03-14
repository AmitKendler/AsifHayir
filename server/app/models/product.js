
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commonModels = require('./commonModels');
const ProductAmountSchema = commonModels.ProductAmountSchema;

exports.ProductSchema = new Schema({
	name: {type: String, required: true},
	description: String,
	imageUrl: String,
	amount: ProductAmountSchema,
	comments: String,
	status: String, // PENDING, TAKEN
	takenBy: {
		type: Schema.Types.ObjectId, 
		required: () => {
			return this.status === 'TAKEN'
		}
	},
	prodType: {type: String, required:true}, // FOOD, CLOTHES, OTHER
	packed: {type: Boolean, required: requiredFor('FOOD')},
	requiresCool: {type: Boolean, required: requiredFor('FOOD')},
	immediateUse: {type: Boolean, required: requiredFor('FOOD')},
	kosher: {type: Boolean, required: requiredFor('FOOD')},
	size: {type: String, required: requiredFor('CLOTHES')},
	condition: {type: String, required: requiredFor('CLOTHES', 'OTHER')}
})

function requiredFor() {
	return () => {
		let productType = arguments;
		if (!Array.isArray(productType)) {
			productType = [productType];
		}

		for (let i = 0; i < productType.length; i++) {
			if (this.prodType === productType[i]) {
				return true;
			}
		}

		return false
	}
}