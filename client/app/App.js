import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    HomeContainer,
    ItemGiveawayContainer,
    LoginContainer,
    AboutUsContainer,
    SettingsContainer,
    RegisterContainer
} from "./containers";
import { Scene, Router, Actions } from "react-native-router-flux";
import { Provider } from "mobx-react/native";
import giveawaysStore from "./stores/giveaways";
import product from "./stores/product";
import leaderboardStore from "./stores/leaderboard";
import userStore from "./stores/user";

export default class App extends React.Component {
    render() {
        return (
            <Provider
        giveawaysStore={giveawaysStore}
        leaderboardStore={leaderboardStore}
        userStore={userStore}
        giveawayStore={product}
      >
        <Router>
          <Scene key="root">
            <Scene
              key="HomeContainer"
              component={HomeContainer}
              hideNavBar={true}
            />
            <Scene
              key="ItemGiveawayContainer"
              component={ItemGiveawayContainer}
              hideNavBar={true}
            />
            <Scene
              key="SettingsContainer"
              component={SettingsContainer}
              hideNavBar={true}
            />
            <Scene
              key="AboutUsContainer"
              component={AboutUsContainer}
              hideNavBar={true}
            />
            <Scene
              key="LoginContainer"
              component={LoginContainer}
              initial={true}
              hideNavBar={true}
            />
            <Scene
              key="RegisterContainer"
              component={RegisterContainer}
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