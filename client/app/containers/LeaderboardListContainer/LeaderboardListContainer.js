import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import LeaderboardList from "./../../components/LeaderboardList/LeaderboardList";
import { StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import media from "./../../media";
import {
    Button,
    Text,
    Container
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
    }
});

class LeaderboardListContainer extends Component {

    componentDidMount() {
        this.animationRef.play();
    }

    render() {
        return (
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
          <Container style={{margin:8}}>
             <Text style={{fontSize:12}}>המתנדבים שלנו יעברו על פרטי המסירה שלך ויצרו עמך קשר בכדי לאסוף אותה, תוכל להתעדכן בסטטוס המסירה שלך בכל עת</Text>
          </Container>
          <Container style={{alignItems:'center',margin:20}}>
            <Button bordered dark>
            <Text>
            צפייה במסירות שלי
             </Text>
          </Button>
          </Container>
      </Container>);
    }

}

export default LeaderboardListContainer;