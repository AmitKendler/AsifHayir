import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions
} from "react-native";
import { GiveawaysList } from "./../../components";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Actions } from "react-native-router-flux";
import { observer, inject } from "mobx-react/native";
import UserContainer from "./../UserContainer/UserContainer";
import LeaderBoardContainer from "./../LeaderBoardContainer/LeaderBoardContainer";
import LeaderboardListContainer from "./../LeaderboardListContainer/LeaderboardListContainer";
import GiveawaysListContainer from "./../GiveawaysListContainer/GiveawaysListContainer";

import {
  Button,
  Icon,
  Fab,
  Container,
  Tab,
  TabHeading,
  Tabs,
  Header,
  ScrollableTab
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  giveawayItemsContainer: {
    backgroundColor: "#fff"
  }
});

const tabsTitles = ["איזור אישי", "רשמת מסירות", "טבלת המובילים"];

@inject("giveawaysStore")
@inject("leaderboardStore")
@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFabs: false,
      title: tabsTitles[0],
      currentTab: 0
    };
  }

  changeTitleByTab(i) {
    this.setState({ title: tabsTitles[i], currentTab: i });
  }

  render() {
    const { giveaways } = this.props.giveawaysStore; // fetch from server []
    const { leaderboard } = this.props.leaderboardStore;
    return (
      <Container>
        <NavbarContainer hasMenu hasTabs title={this.state.title}>
          <Tabs
            renderTabBar={() => <ScrollableTab />}
            onChangeTab={({ i, ref, from }) => this.changeTitleByTab(i)}
          >
            <Tab
              tabStyle={{ width: "100%" }}
              heading={
                <TabHeading
                  style={{ width: Dimensions.get("window").width / 3 }}
                >
                  <Icon name="person" />
                </TabHeading>
              }
            >
              <ScrollView>
                <UserContainer />
              </ScrollView>
            </Tab>
            <Tab
              heading={
                <TabHeading
                  style={{ width: Dimensions.get("window").width / 3 }}
                >
                  <Icon name="list" />
                </TabHeading>
              }
            >
              <ScrollView style={styles.giveawayItemsContainer}>
                <GiveawaysListContainer giveaways={giveaways} />
              </ScrollView>
            </Tab>
            <Tab
              heading={
                <TabHeading
                  style={{ width: Dimensions.get("window").width / 3 }}
                >
                  <Icon name="trophy" />
                </TabHeading>
              }
            >
              <LeaderboardListContainer leaderboard={leaderboard} />
            </Tab>
          </Tabs>
          {this.state.currentTab !== 0
            ? <Fab
                active={this.state.activeFabs}
                direction="left"
                style={{ backgroundColor: "#5067FF" }}
                position="bottomRight"
                onPress={() =>
                  this.setState({ activeFabs: !this.state.activeFabs })}
              >
                <Icon name="add" />
                <Button
                  style={{ backgroundColor: "#34A34F" }}
                  onPress={Actions.FoodGiveawayContainer}
                >
                  <Icon name="pizza" />
                </Button>
                <Button
                  style={{ backgroundColor: "#3B5998" }}
                  onPress={Actions.ClothesGiveawayContainer}
                >
                  <Icon name="shirt" />
                </Button>
                <Button
                  style={{ backgroundColor: "#DD5144" }}
                  onPress={Actions.FurnitureGiveawayContainer}
                >
                  <Icon name="basket" />
                </Button>
              </Fab>
            : null}
        </NavbarContainer>
      </Container>
    );
  }
}

export default HomeContainer;
