import React, { Component } from "react";
import { ScrollView } from "react-native";
import LeaderboardItem from "./../LeaderboardItem/LeaderboardItem";
import { observer } from "mobx-react/native";
import { Content } from "native-base";

@observer
class LeaderboardList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { leaderboard } = this.props;
        return (
            <ScrollView>
                {leaderboard.map((g, i) =>
                    <LeaderboardItem index={i} key={i} />
                )}
            </ScrollView>
        );
    }
}
export default LeaderboardList;
