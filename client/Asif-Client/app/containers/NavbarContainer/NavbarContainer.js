import React from "react";
import { View, Platform, StatusBar, StyleSheet } from "react-native";
import {
  Header,
  Title,
  Input,
  InputGroup,
  Body,
  Button,
  Icon,
  Left,
  Right,
  Text
} from "native-base";
import { Actions } from "react-native-router-flux";

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});

const NavbarContainer = ({
  hasBack,
  hasMenu,
  children,
  title,
  hasNext,
  onPressNext,
  hasCheck,
  onPressCheck
}) =>
  <View style={{ flex: 1 }}>
    <Header hasTabs style={styles.header}>
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
      {hasNext &&
        <Right>
          <Button transparent onPress={onPressNext}>
            <Text>הבא</Text>
          </Button>
        </Right>}
      {hasCheck &&
        <Right>
          <Button transparent onPress={onPressCheck}>
            <Icon name="checkmark" />
          </Button>
        </Right>}
    </Header>
    {children}
  </View>;

export default NavbarContainer;
