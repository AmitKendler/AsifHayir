import React, { Component } from "react";
import { Text, View, ScrollView, Animated, StyleSheet } from "react-native";
import { GiveawaysList } from "./../../components";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Actions } from "react-native-router-flux";
import { observer, inject } from "mobx-react/native";
import UserContainer from "./../UserContainer/UserContainer";
import GiveawaysListContainer from "./../GiveawaysListContainer/GiveawaysListContainer";
import {
  Button,
  Icon,
  Fab,
  Container,
  Tab,
  Tabs,
  Header,
  ScrollableTab
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "#fff"
  },
  giveawayItemsContainer: {
    backgroundColor: "#fff"
  }
});

@inject("giveawaysStore")
@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFabs: false
    };
  }

  render() {
    const { giveaways } = this.props.giveawaysStore; // fetch from server []
    return (
      <Container>
        <NavbarContainer hasMenu>
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="איזור אישי">
              <ScrollView style={styles.userContainer}>
                <UserContainer />
              </ScrollView>
            </Tab>
            <Tab heading="מסירות">
              <ScrollView style={styles.giveawayItemsContainer}>
                <GiveawaysListContainer giveaways={giveaways} />
              </ScrollView>
            </Tab>
            <Tab heading="טבלת המובילים" />
          </Tabs>
          <Fab
            active={this.state.activeFabs}
            direction="left"
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() =>
              this.setState({ activeFabs: !this.state.activeFabs })}
          >
            <Icon name="add" />
            <Button style={{ backgroundColor: "#34A34F" }}>
              <Icon name="pizza" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="shirt" />
            </Button>
            <Button style={{ backgroundColor: "#DD5144" }}>
              <Icon name="basket" />
            </Button>
          </Fab>
        </NavbarContainer>
      </Container>
    );
  }
}

export default HomeContainer;
