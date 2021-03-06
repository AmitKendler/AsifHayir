import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    HomeContainer,
    ItemGiveawayContainer,
    LoginContainer,
    AboutUsContainer,
    SettingsContainer,
    RegisterContainer,
    GiveawayFinishContainer
} from "./containers";
import { Scene, Router, Actions } from "react-native-router-flux";
import { Provider } from "mobx-react/native";
import giveawaysStore from "./stores/giveaways";
import product from "./stores/product";
import leaderboardStore from "./stores/leaderboard";
import userStore from "./stores/user";
import backendStore from "./stores/backend";
import { Root } from "native-base";

export default class App extends React.Component {
    render() {
        return (
            <Root>
            <Provider
        giveawaysStore={giveawaysStore}
        leaderboardStore={leaderboardStore}
        userStore={userStore}
        giveawayStore={product}
        backendStore={backendStore}
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
              hideNavBar={true}
              initial={true}
            />
            <Scene
              key="RegisterContainer"
              component={RegisterContainer}
              hideNavBar={true}
            />
              <Scene
              key="GiveawayFinishContainer"
              component={GiveawayFinishContainer}
              hideNavBar={true}
            />
          </Scene>
        </Router>
      </Provider>
      </Root>
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