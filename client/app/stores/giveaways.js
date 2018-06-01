import { observable, action } from 'mobx';
import list from './giveaways.json'; // TEMPORARLY - UNTIL BACKEND
import Constants from "./../utils/Constants";
import userStore from "./user";

class Giveaways {
    @observable giveaways = [];

    constructor(props) {
        this.giveaways = [1,2,3,4,5,6,7,8,9,10,11,12]//list.branch.slice(); // fetch from server []
    }

    loadGiveaways()
    {
     fetch(`${Constants.BACKEND_URL}/giveaways/users/${userStore.user._id}`, {
        headers: {
            "auth-token": userStore.token
        }
	    })
	    .then(response => response.json())
	    .then(responseJson => {
	        this.giveaways = responseJson;
	        console.log("my giveaways" ,this.giveaways[0].products);
	    })
	    .catch(error => {
	        console.error(error);
	    });
    }

}

export default new Giveaways();
