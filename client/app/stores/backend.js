import { observable, action } from "mobx";
class TopUsers {
	@observable backendIp = "";
	@observable backendPort = "";

	constructor(props) {
		(this.backendIp = "192.168.1.26"), (this.backendPort = "3000");
	}
}

export default new TopUsers();
