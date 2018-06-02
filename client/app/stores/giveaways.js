import { observable, action } from 'mobx';
import list from './giveaways.json'; // TEMPORARLY - UNTIL BACKEND
import Constants from "./../utils/Constants";
import userStore from "./user";

class Giveaways {
    @observable giveaways = [];

    constructor(props) {
        this.giveaways = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] //list.branch.slice(); // fetch from server []
    }

    loadGiveaways() {
        fetch(`${Constants.BACKEND_URL}/giveaways/users/${userStore.user._id}`, {
                headers: {
                    "auth-token": userStore.token
                }
            })
            .then(response => response.json())
            .then(responseJson => {
                this.giveaways = {
                    newArr: [],
                    pendingArr: [],
                    takenArr: []
                };

                // HORIFIC CODE AHEAD - NO TIME TO BURN ON ES6 PRETYNESS
                for (var i = responseJson.length - 1; i >= 0; i--) {
                    for (var j = responseJson[i].products.length - 1; j >= 0; j--) {
                        var currProd = responseJson[i].products[j];
                        if (currProd.status === Constants.STATUSES.NEW) {
                            this.giveaways.newArr.push(currProd);
                        } else if (currProd.status === Constants.STATUSES.PENDING) {
                            this.giveaways.pendingArr.push(currProd);
                        } else if (currProd.status === Constants.STATUSES.TAKEN) {
                            this.giveaways.takenArr.push(currProd);
                        }
                    }
                }

                console.log("my giveaways", this.giveaways);
            })
            .catch(error => {
                console.error(error);
            });
    }

}

export default new Giveaways();