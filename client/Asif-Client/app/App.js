import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HomeContainer} from './containers';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Provider } from 'mobx-react/native';
import giveawaysStore from './stores/giveaways'

export default class App extends React.Component {
  render() {
    return (
    <Provider giveawaysStore={giveawaysStore}>
      <Router>
      <Scene key="root">
        <Scene key="HomeContainer" component={HomeContainer} initial={true} hideNavBar={true} />
      </Scene>
      </Router>
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
