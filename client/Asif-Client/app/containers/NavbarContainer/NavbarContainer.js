import React from "react";
import { View, Text } from "react-native";
import {
  Header,
  Title,
  Input,
  InputGroup,
  Body,
  Button,
  Icon,
  Left,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";

const NavbarContainer = ({ hasBack, hasMenu, children, title }) =>
  <View style={{ flex: 1 }}>
    <Header hasTabs>
      {hasBack &&
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon style={{ color: "white" }} name="arrow-back" />
          </Button>
        </Left>}
      {hasMenu &&
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>}
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
    {children}
  </View>;

export default NavbarContainer;
