import React, { Component } from 'react';
import { Text,View, ScrollView, Animated,StyleSheet} from 'react-native';
import { observer, inject } from 'mobx-react/native'
import { Button, Icon, Fab, Content } from 'native-base';
import GiveawaysList from './../../components/GiveawaysList/GiveawaysList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

class GiveawsaysListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { giveaways } = this.props;
        return (
            <View>
                <GiveawaysList giveaways={giveaways}></GiveawaysList>
            </View>
        )
    }
}

export default GiveawsaysListContainer;