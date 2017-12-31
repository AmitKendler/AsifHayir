import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Button, Icon, Fab, Content, Text } from "native-base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

class UserContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeFabs: "false"
        };
    }

    render() {
        return (
            <View style={{ height: 100 }}>
                <Text>ניקוד : 100</Text>
            </View>
        );
    }
}

export default UserContainer;
