import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react/native";
import { Button, Icon, Fab, Content, Text } from "native-base";
import LeaderBoardListContainer from "./../LeaderboardListContainer/LeaderboardListContainer";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

class LeaderBoardContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { leaderboard } = this.props;
        return <LeaderboardListContainer leaderboard={leaderboard} />;
    }
}

export default LeaderBoardContainer;
