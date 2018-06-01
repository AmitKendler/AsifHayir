import { observable, action } from "mobx";
import Constants from "./../utils/Constants";

class Product {
	@observable product;
	@observable giveaway;
	@observable products = [];

	constructor(props) {
		this.product = {
			name: "",
			description: "",
			imageUrl: "",
			amount: {
				amount: 0,
				units: Constants.AMMOUNT_TYPES.ITEMS
			},
			prodType: "", // FOOD, CLOTHES, OTHER
			packed: false, // FOOD
			requiresCool: false, // FOOD
			immediateUse: false, // FOOD,
			kosher: false, // FOOD
			size: false, // CLOTHERS
			condition: false // CLOTHES
		};

		this.giveaway = {
			userId: "",
			address: {
				location: null,
				city: "n/a",
				streetName: "n/a",
				houseNumber: "n/a",
				aptNumber: 0
			},
			pickupTime: {
				startTime: new Date(),
				endTime: new Date()
			},
			contact: { name: "", phone: "0" },
			products: []
		};
	}

	addProductToList(product) {
		// TODO: add data validation
		this.products.push(product);
	}

	postGiveaway(token) {
		this.giveaway.products.push(this.product);
		// TODO: Validate data
		console.log(this.giveaway);

		fetch(Constants.BACKEND_URL + "/giveaways", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"auth-token":token
			},
			body: JSON.stringify(this.giveaway)
		})
			.then(response => response.json())
			.then(responseJson => {
				alert(responseJson);
			})
			.catch(error => {
				console.error(error);
			});
	}
}

export default new Product();
