import React, { Component } from "react";
import { Image, Platform, ImageBackground } from "react-native";
import { Actions } from "react-native-router-flux";
import {
    Container,
    Content,
    Text,
    Item,
    Input,
    Button,
    Icon,
    View,
    Left,
    Spinner,
    Right
} from "native-base";
import { Facebook, Permissions, Notifications } from "expo";
import firebase from "firebase";
import { observer, inject } from "mobx-react/native";

import styles from "./styles";

import media from "./../../media";

// Enter your Facebooko app ID here.
const FACEBOOK_APP_ID = "1946764752034197";

var config = {
    apiKey: "AIzaSyCLjvInkTICWVDqRKx7HcGztQD--pI0mEE",
    authDomain: "leftright-2e5de.firebaseapp.com",
    databaseURL: "https://leftright-2e5de.firebaseio.com",
    projectId: "leftright-2e5de",
    storageBucket: "leftright-2e5de.appspot.com",
    messagingSenderId: "371521623116"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

@inject("userStore")
@observer
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    async function registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        this.props.userStore.sendNotificationToken(token);
    }

    async handleFacebookButton() {
        this.props.userStore.isLoggingIn = true;
        const {
            type,
            token
        } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
            permissions: ["public_profile", "email"]
        });
        if (type === "success") {
            //Firebase credential is created with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
                token
            );

            try {
                const currentUser = await firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential);

                if (currentUser) {
                    currentUser.user.getIdToken(true).then(idToken => {

                        this.props.userStore.loginWithToken(idToken, currentUser.user);
                        this.registerForPushNotificationsAsync();
                    });

                    //     .then(idtoken=>
                    //         {
                    //             console.log("idtoken",idtoken);
                    //     this.props.userStore.loginWithToken(idtoken
                    //     );
                    // });
                    // console.log(this.props.userStore);  
                } else {
                    alert("failed logon..");
                }

                // TODO : send server side request to return real user

                //Ap=
            } catch (e) {
                console.error(e);
            }
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <ImageBackground
                        source={media.login.bg}
                        style={styles.background}
                    >
                        <Image
                            source={media.login.logo}
                            style={
                                Platform.OS === "android"
                                    ? styles.aShadow
                                    : styles.iosShadow
                            }
                        />

                        <View style={styles.bg}>
                            {/*
                            <Item rounded style={styles.inputGrp}>
                                <Icon name="person" style={styles.icon} />
                                <Input
                                    placeholder="שם משתמש"
                                    onChangeText={username =>
                                        this.setState({ username })}
                                    placeholderTextColor="#FFF"
                                    style={styles.input}
                                />
                            </Item>

                            <Item rounded style={styles.inputGrp}>
                                <Icon name="unlock" style={styles.icon} />
                                <Input
                                    placeholder="סיסמא"
                                    secureTextEntry
                                    placeholderTextColor="#FFF"
                                    onChangeText={password =>
                                        this.setState({ password })}
                                    style={styles.input}
                                />
                            </Item>
                        */}
                  
                            {this.props.userStore.isLoggingIn?<Spinner/>:
                            <Button
                                rounded
                                primary
                                block
                                large
                                style={styles.loginBtn}
                                onPress={() => this.handleFacebookButton()}
                            >
                                <Text
                                    style={
                                        Platform.OS === "android"
                                            ? {
                                                  fontSize: 16,
                                                  textAlign: "center",
                                                  top: -5
                                              }
                                            : {
                                                  fontSize: 16,
                                                  fontWeight: "900"
                                              }
                                    }
                                >
                                    Login With Facebook
                                </Text>
                            </Button>
                            }

                            {/*<View style={styles.otherLinksContainer}>
                                <Left>
                                    <Button
                                        transparent
                                        style={{ alignSelf: "flex-start" }}
                                    >
                                        <Text style={styles.helpBtns}>
                                            צור משתמש
                                        </Text>
                                    </Button>
                                </Left>
                                <Right>
                                    <Button
                                        transparent
                                        style={{ alignSelf: "flex-end" }}
                                    >
                                        <Text style={styles.helpBtns}>
                                            שכחתי סיסמא
                                        </Text>
                                    </Button>
                                </Right>
                            </View>
                        */}
                        </View>
                    </ImageBackground>

                </Content>
            </Container>
        );
    }
}

export default LoginContainer;