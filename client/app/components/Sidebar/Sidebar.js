import React, { Component } from "react";
import { Image, StyleSheet, Platform, Dimensions } from "react-native";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge
} from "native-base";
import { Actions } from "react-native-router-flux";

import media from "./../../media";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    drawerCover: {
        alignSelf: "stretch",
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    drawerImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
        top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
        width: 100,
        height: 110,
        resizeMode: "stretch",
        marginLeft: 60
    },
    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    }
});

const datas = [{
        name: "מי אנחנו",
        route: "AboutUsContainer",
        icon: "information-circle",
        bg: "#C5F442"
    },
    {
        name: "הגדרות",
        route: "RegisterContainer",
        icon: "cog",
        bg: "#C5F442"
    },
    {
        name: "התנתק",
        route: "Header",
        icon: "log-out",
        bg: "#477EEA"
    }
];

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={media.drawer.cover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={media.drawer.logo} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem button noBorder onPress={Actions[data.route]}>
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
        );
    }
}

export default SideBar;