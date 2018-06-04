import { observable, action } from "mobx";
import Constants from "./../utils/Constants";
import { Actions } from "react-native-router-flux";
import giveawayStore from "./giveaways";
import backendStore from "./backend";

class User {
    @observable user = [];
    @observable token = "";
    @observable isLoggingIn = false;
    @observable registerUser = {};

    constructor(props) {
        this.user = null;
        this.token = null;
        this.registerUser = {
            phone: "",
            address: {
                streetName: "",
                city: "",
                houseNumber: "",
                aptNumber: 0
            }
        };
    }

    createServerUserFromFirebaseUser(user) {
        const fullname = user.displayName.split(" ");

        const serverUser = {
            firstName: fullname[0],
            lastName: fullname[1],
            imageUrl: user.photoURL,
            phone: "",
            address: {
                streetName: "",
                city: "",
                houseNumber: "",
                aptNumber: 0
            },
            isVolunteer: false,
            authId: user.uid
        };

        return serverUser;
    }

    preloginWithToken(token, user) {
        //TODO check if user exists and cache
        this.registerUser = this.createServerUserFromFirebaseUser(user);
        this.token = token;

        fetch(`${backendStore.BACKEND_URL()}/user/exists`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": this.token
            },
            body: JSON.stringify({ uid: this.registerUser.authId })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson._id) {
                    this.user = responseJson;
                    giveawayStore.loadGiveaways();
                    Actions.HomeContainer();
                } else {
                    Actions.RegisterContainer();
                }
            });
    }

    loginWithToken() {
        this.isLoggingIn = true;
        fetch(`${backendStore.BACKEND_URL()}/login/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": this.token
            },
            body: JSON.stringify(this.registerUser)
        })
            .then(response => response.json())
            .then(responseJson => {
                this.user = responseJson;
                giveawayStore.loadGiveaways();
                this.isLoggingIn = false;
                Actions.HomeContainer();
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateUserInfo() {
        fetch(`${backendStore.BACKEND_URL()}/user/update`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": this.token
            },
            body: JSON.stringify({
                userId: this.user._id,
                address: this.user.address,
                phone: this.user.phone
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson._id === this.user._id) {
                    Actions.HomeContainer();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    sendNotificationToken(pushToken) {
        if (this.user._id) {
            fetch(`${backendStore.BACKEND_URL()}/user/push-token`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "auth-token": this.token
                },
                body: JSON.stringify({
                    userId: this.user._id,
                    token: pushToken
                })
            }).catch(error => {
                console.error(error);
            });
        }
    }
}

export default new User();
