import { observable, action } from "mobx";
import Constants from "./../utils/Constants";
class User {
    @observable user = [];

    constructor(props) {
        this.user = null;
        // this.user = {
        //     firstName: "Yosi",
        //     lastName: "Kendler",
        //     profileUrl: "",
        //     title: "מוסר מתחיל",
        //     rank: 123,
        //     giveaways: 10,
        //     score: 1920,
        //     defaultPhone: "052-5848832",
        //     defaultAddress: "הרצליה חנה סנש 21"
        // };

        // fetch(Constants.BACKEND_URL + '/GetUserById/5ab155046a5cc7cc8731f33f')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.user = responseJson;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        //     .then((responseJson) => {
        //         this.user = responseJson;
        //         alert(responseJson);
        //     });
    }

    loginWithToken(token) {
        fetch(`${Constants.BACKEND_URL}/login/${token}`, {
            headers: { "auth-token": token }
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log("user authenticated!!", responseJson);
                this.user = responseJson;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new User();
