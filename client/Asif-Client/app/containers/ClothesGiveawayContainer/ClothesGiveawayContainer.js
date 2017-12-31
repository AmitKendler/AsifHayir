import React, { Component } from "react";
import { View } from "react-native";
import { Text, Container } from "native-base";
import { Actions } from "react-native-router-flux";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";

class ClothesGiveawayContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <NavbarContainer hasBack title={"מסירת בגדים"}>
                    <Text>Clothes Giveaway Container</Text>
                </NavbarContainer>
            </Container>
        );
    }
}

export default ClothesGiveawayContainer;
