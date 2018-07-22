import { observable, action } from "mobx";
import list from "./giveaways.json"; // TEMPORARLY - UNTIL BACKEND
import Constants from "./../utils/Constants";
import userStore from "./user";
import backendStore from "./backend";
class Giveaways {
    @observable giveaways = [];
    @observable giveawaysCount = 0;
    @observable giveawaysScore = 0;

    constructor(props) {
        this.giveaways = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //list.branch.slice(); // fetch from server []
    }

    loadGiveaways() {
        fetch(
            `${backendStore.BACKEND_URL()}/giveaways/users/${
                userStore.user._id
            }`,
            {
                headers: {
                    "auth-token": userStore.token
                }
            }
        )
            .then(response => response.json())
            .then(responseJson => {
                this.giveaways = {
                    newArr: [],
                    pendingArr: [],
                    takenArr: []
                };

                this.giveawaysCount = 0;
                this.giveawaysScore = 0;
                // HORIFIC CODE AHEAD - NO TIME TO BURN ON ES6 PRETYNESS
                for (var i = responseJson.length - 1; i >= 0; i--) {
                    for (
                        var j = responseJson[i].products.length - 1;
                        j >= 0;
                        j--
                    ) {
                        var currProd = responseJson[i].products[j];
                        if (currProd.status === Constants.STATUSES.NEW) {
                            this.giveaways.newArr.push(currProd);
                            this.giveawaysCount++;
                            this.giveawaysScore += 10;
                        } else if (
                            currProd.status === Constants.STATUSES.PENDING
                        ) {
                            this.giveaways.pendingArr.push(currProd);
                            this.giveawaysCount++;
                            this.giveawaysScore += 15;
                        } else if (
                            currProd.status === Constants.STATUSES.TAKEN
                        ) {
                            this.giveaways.takenArr.push(currProd);
                            this.giveawaysCount++;
                            this.giveawaysScore += 20;
                        }
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new Giveaways();
