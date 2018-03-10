import React, { Component } from "react";
import { Text, Container } from "native-base";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";

class SettingsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <NavbarContainer hasBack title={""}>
                    <Text>SettingsContainer</Text>
                </NavbarContainer>
            </Container>
        );
    }
}

export default SettingsContainer;
