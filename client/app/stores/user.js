import { observable, action } from "mobx";
import Constants from "./../utils/Constants";
import { Actions } from "react-native-router-flux";
import giveawayStore from "./giveaways";
class User {
    @observable user = [];
    @observable token = "";
    @observable isLoggingIn = false;

    constructor(props) {
        this.user = null;
        this.token = null;
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
        this.isLoggingIn = true;
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
                giveawayStore.loadGiveaways();
                this.isLoggingIn = false;
                Actions.RegisterContainer();
            })
            .catch(error => {
                console.error(error);
            });
    }

    sendNotificationToken(pushToken) {
        if (this.user._id) {
            fetch(`${Constants.BACKEND_URL}/user/push-token`, {
                method: "POST",

                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "auth-token": this.token
                },
                body: JSON.stringify({
                    userId: this.user._id,
                    token: pushToken
                })
            }).catch(error => {
                console.error(error);
            })
        }
    }
}

export default new User();