import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react/native";
import {
    Button,
    Icon,
    Fab,
    Content,
    Text,
    Card,
    Body,
    Right,
    Left,
    CardItem,
    Thumbnail,
    H1,
    H2,
    H3
} from "native-base";
import { Actions } from "react-native-router-flux";

import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
    subTitle: {
        color: "grey"
    },
    centerize: {
        alignItems: "center"
    },
    actionTiles: {
        color: "#fff",
        fontSize: 60,
        textShadowRadius: 10
    },
    middleActionTile: {
        alignItems: "center",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "grey"
    },
    title: { marginTop: 15, marginRight: 12 }
});

const ActionTile = ({ iconName, color, tileTitle, Action, phone, contact }) => {
    return (
        <Col style={styles.actionTiles}>
            <Card>
                <CardItem
                    button
                    style={{ backgroundColor: color }}
                    onPress={() =>
                        Action({
                            title: tileTitle,
                            phone: phone,
                            contact: contact
                        })}
                >
                    <Body style={styles.centerize}>
                        <Icon style={styles.actionTiles} name={iconName} />
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Body style={styles.centerize}>
                        <Text>{tileTitle}</Text>
                    </Body>
                </CardItem>
            </Card>
        </Col>
    );
};

@inject("userStore")
class UserContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userStore } = this.props;
        return (
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <Grid>
                                <Col style={styles.title}>
                                    <H2>
                                        {userStore.user.firstName}{" "}
                                        {userStore.user.lastName}
                                    </H2>
                                    <H3 style={styles.subTitle}>
                                        {userStore.user.title}
                                    </H3>
                                </Col>
                                <Col>
                                    <Thumbnail
                                        large
                                        source={{
                                            uri:
                                                "https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?h=350&auto=compress&cs=tinysrgb 1x, https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb 2x"
                                        }}
                                    />
                                </Col>
                            </Grid>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Grid>
                            <Col style={styles.centerize}>
                                <H1>{userStore.user.rank}</H1>
                                <Text note>מיקום</Text>
                            </Col>
                            <Col style={styles.middleActionTile}>
                                <H1>{userStore.user.giveaways}</H1>
                                <Text note>מסירות</Text>
                            </Col>
                            <Col style={styles.centerize}>
                                <H1>{userStore.user.score}</H1>
                                <Text note>ניקוד</Text>
                            </Col>
                        </Grid>
                    </CardItem>
                </Card>

                <Grid>
                    <ActionTile
                        Action={Actions.ItemGiveawayContainer}
                        phone={userStore.user.defaultPhone}
                        contact={
                            userStore.user.firstName +
                            " " +
                            userStore.user.lastName
                        }
                        iconName="pizza"
                        color="#FFB74D"
                        tileTitle="מסירת מזון"
                    />
                </Grid>
                <Grid>
                    <ActionTile
                        Action={Actions.ItemGiveawayContainer}
                        phone={userStore.user.defaultPhone}
                        contact={
                            userStore.user.firstName +
                            " " +
                            userStore.user.lastName
                        }
                        iconName="basket"
                        color="#AED581"
                        tileTitle="מסירת רהיטים"
                    />
                    <ActionTile
                        Action={Actions.ItemGiveawayContainer}
                        phone={userStore.user.defaultPhone}
                        contact={
                            userStore.user.firstName +
                            " " +
                            userStore.user.lastName
                        }
                        iconName="shirt"
                        color="#4FC3F7"
                        tileTitle="מסירת בגדים"
                    />
                </Grid>

            </Content>
        );
    }
}

export default UserContainer;
