import { observable, action } from "mobx";
import Constants from "./../utils/Constants";
import { Actions } from "react-native-router-flux";
import giveawayStore from "./giveaways";
class User {
    @observable user = [];
    @observable token = "";

    constructor(props) {
        this.user = null;
        this.token = null;
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

    createServerUserFromFirebaseUser(user) {
        const fullname = user.displayName.split(" ");

        const serverUser = {
            firstName: fullname[0],
            lastName: fullname[1],
            imageUrl: user.photoURL,
            phone: "0525848832",
            address: {
                streetName: "קרליבך",
                city: "תל אביב ",
                houseNumber: "4ג",
                aptNumber: 26
            },
            isVolunteer: false,
            authId: user.uid
        }

        return serverUser;
    }

    loginWithToken(token, user) {
        const postUser = this.createServerUserFromFirebaseUser(user)
        console.log(postUser);

        fetch(`${Constants.BACKEND_URL}/login/`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify(postUser)
            })
            .then(response => response.json())
            .then(responseJson => {
                this.token = token;
                this.user = responseJson;
                console.log("user!",responseJson);
                giveawayStore.loadGiveaways();
                Actions.HomeContainer();
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default new User();