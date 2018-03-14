import { observable, action } from "mobx";
class User {
	@observable user = [];

	constructor(props) {
		this.user = {
			firstName: "Amit",
			lastName: "Kendler",
			profileUrl: "",
			title: "מוסר מתחיל",
			rank: 123,
			giveaways: 10,
			score: 1920,
			defaultPhone: "052-5848832",
			defaultAddress: "הרצליה חנה סנש 21"
		};
	}
}

export default new User();
