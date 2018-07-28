import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import LeaderboardList from "./../../components/LeaderboardList/LeaderboardList";
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { DangerZone } from 'expo';
import { Actions } from "react-native-router-flux";
import media from "./../../media";
import {
    Button,
    Text,
    Container,
    Right,
    Icon,
    Header
} from "native-base";

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
    congrationationText: {
        fontSize: 30
    },
    header: {
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight,
                backgroundColor: '#eee',
            }
        })
    }
});

class GiveawayFinishContainer extends Component {

    componentDidMount() {
        this.animationRef.play();
    }

    render() {
        return (
            <Container>
            <Header transparent noShadow style={styles.header}>
              <Right>
              <Button transparent dark onPress={() => Actions.HomeContainer()}>
                <Icon name="close" />
              </Button>
              </Right>
              </Header>
              <Container style={styles.animationContainer}>
              <Text style={styles.congrationationText}>כל הכבוד!</Text>
              <Lottie
              ref={animation => {
              this.animationRef = animation;
              }}
              style={{
              width: 250,
              height: 250   ,
              backgroundColor: '#eee',
              }}

              source={media.animations.clap}
              />
               
                <Container style={{alignItems:'center',margin:20}}>
                <Button bordered dark onPress={() => Actions.HomeContainer()}>
                <Text>
                צפייה במסירות שלי
                </Text>
                </Button>
              </Container>
            </Container>
          </Container>
        );
    }

}

export default GiveawayFinishContainer;