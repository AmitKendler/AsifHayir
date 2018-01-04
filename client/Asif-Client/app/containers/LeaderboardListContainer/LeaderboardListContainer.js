import React, { Component } from "react";
import { Text, View } from "react-native";
import { observer, inject } from "mobx-react/native";
import LeaderboardList from "./../../components/LeaderboardList/LeaderboardList";

class LeaderboardListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { leaderboard } = this.props;
        return (
            <View>
                <LeaderboardList leaderboard={leaderboard} />
            </View>
        );
    }
}

export default LeaderboardListContainer;
