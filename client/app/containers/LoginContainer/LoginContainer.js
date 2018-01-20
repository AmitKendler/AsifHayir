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
    Right
} from "native-base";

import styles from "./styles";

import media from "./../../media";

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
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

                            <Button
                                rounded
                                primary
                                block
                                large
                                style={styles.loginBtn}
                                onPress={Actions.HomeContainer}
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
                                    התחבר
                                </Text>
                            </Button>

                            <View style={styles.otherLinksContainer}>
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
                        </View>

                    </ImageBackground>

                </Content>
            </Container>
        );
    }
}

export default LoginContainer;
