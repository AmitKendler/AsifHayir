import { observable, action } from "mobx";
class TopUsers {
	@observable backendIp = "";
	@observable backendPort = "";

	constructor(props) {
		(this.backendIp = "192.168.43.108"), (this.backendPort = "3000");
	}

	BACKEND_URL() {
		return `http://${this.backendIp}:${this.backendPort}`;
	}
}

export default new TopUsers();
