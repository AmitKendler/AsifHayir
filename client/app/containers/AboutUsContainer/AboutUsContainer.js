import React, { Component } from "react";
import { Text, Container } from "native-base";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";

class AbousUsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <NavbarContainer hasBack title={""}>
                    <Text>About Us</Text>
                </NavbarContainer>
            </Container>
        );
    }
}

export default AbousUsContainer;
