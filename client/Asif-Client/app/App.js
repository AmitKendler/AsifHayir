import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  HomeContainer,
  FoodGiveawayContainer,
  ClothesGiveawayContainer,
  FurnitureGiveawayContainer
} from "./containers";
import { Scene, Router, Actions } from "react-native-router-flux";
import { Provider } from "mobx-react/native";
import giveawaysStore from "./stores/giveaways";
import leaderboardStore from "./stores/leaderboard";

export default class App extends React.Component {
  render() {
    return (
      <Provider
        giveawaysStore={giveawaysStore}
        leaderboardStore={leaderboardStore}
      >
        <Router>
          <Scene key="root">
            <Scene
              key="HomeContainer"
              component={HomeContainer}
              initial={true}
              hideNavBar={true}
            />
            <Scene
              key="FoodGiveawayContainer"
              component={FoodGiveawayContainer}
              hideNavBar={true}
            />
            <Scene
              key="FurnitureGiveawayContainer"
              component={FurnitureGiveawayContainer}
              hideNavBar={true}
            />
            <Scene
              key="ClothesGiveawayContainer"
              component={ClothesGiveawayContainer}
              hideNavBar={true}
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
