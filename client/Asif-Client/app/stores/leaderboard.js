import { observable, action } from "mobx";
class leaderboard {
	@observable leaderboard = [];

	constructor(props) {
		this.leaderboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //list.branch.slice(); // fetch from server []
	}
}

export default new leaderboard();
