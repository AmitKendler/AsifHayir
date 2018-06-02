import { observable, action } from "mobx";
import Constants from "./../utils/Constants";
import userStore from "./user";
import giveawayStore from "./giveaways";
import { Actions } from "react-native-router-flux";

class Product {
    @observable product;
    @observable giveaway;
    @observable products = [];

    constructor(props) {
        this.initStore();
    }

    initStore() {
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

    postGiveaway() {
        this.giveaway.products.push(this.product);
        // TODO: Validate data
        console.log(this.giveaway);

        fetch(Constants.BACKEND_URL + "/giveaways", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "auth-token": userStore.token
                },
                body: JSON.stringify(this.giveaway)
            })
            .then(response => response.json())
            .then(responseJson => {
                giveawayStore.loadGiveaways();
                this.initStore();
                Actions.HomeContainer();
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new Product();