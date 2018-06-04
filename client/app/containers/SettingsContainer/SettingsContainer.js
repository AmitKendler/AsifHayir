import React, { Component } from "react";
import { Form, Icon, Input, Item, Text, Picker, ListItem } from "native-base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react/native";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
import cities from "./../../utils/cities";
import streets from "./../../utils/streets";
import AutoSuggest from "react-native-autosuggest";
import ModalFilterPicker from "react-native-modal-filter-picker";

// TODO add to global styles
const styles = StyleSheet.create({
    mainLabel: { margin: 15, color: "#333333", fontSize: 18 },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1
    },
    container: {
        backgroundColor: "#F5FCFF",
        flex: 1,
        paddingTop: 25
    }
});

@inject("userStore")
@inject("backendStore")
@observer
class SettigsContainer extends Component {
    constructor(props, ctx) {
        super(props, ctx);

        this.state = {
            streetsVisible: false,
            citiesVisible: false
        };

        this.citiesOptions = cities.cities.map(city => ({
            key: city,
            label: city
        }));

        this.streetsOptions = streets.streets.map(street => ({
            key: street,
            label: street
        }));
    }

    render() {
        const { citiesVisible, picked } = this.state;

        return (
            <NavbarContainer
                title="הגדרות משתמש"
                hasCheck
                onPressCheck={() => this.props.userStore.updateUserInfo()}
            >
                <ListItem itemDivider style={{ textAlign: "right" }}>
                    <Text>הגדרות</Text>
                </ListItem>
                <Item>
                    <Input
                        style={{ textAlign: "right" }}
                        keyboardType="phone-pad"
                        placeholder="טלפון"
                        value={this.props.userStore.user.phone}
                        onChangeText={value =>
                            (this.props.userStore.user.phone = value)
                        }
                    />
                    <Icon name="call" />
                </Item>
                <Item onPress={() => this.setState({ citiesVisible: true })}>
                    <Input
                        disabled
                        placeholder="עיר "
                        value={this.props.userStore.user.address.city}
                    />
                </Item>
                <Item onPress={() => this.setState({ streetsVisible: true })}>
                    <Input
                        disabled
                        placeholder="רחוב "
                        value={this.props.userStore.user.address.streetName}
                    />
                </Item>

                <Grid>
                    <Col>
                        <Item>
                            <Input
                                style={{ textAlign: "right" }}
                                keyboardType="numeric"
                                placeholder="דירה "
                                value={this.props.userStore.user.address.aptNumber.toString()}
                                onChangeText={value =>
                                    (this.props.userStore.user.address.aptNumber = value.toString())
                                }
                            />
                        </Item>
                    </Col>
                    <Col>
                        <Item>
                            <Input
                                style={{ textAlign: "right" }}
                                placeholder="מספר "
                                value={
                                    this.props.userStore.user.address
                                        .houseNumber
                                }
                                onChangeText={value =>
                                    (this.props.userStore.user.address.houseNumber = value)
                                }
                            />
                        </Item>
                    </Col>
                </Grid>
                <ListItem itemDivider style={{ textAlign: "right" }}>
                    <Text>הגדרות שרת</Text>
                </ListItem>
                <Item>
                    <Input
                        style={{ textAlign: "left" }}
                        keyboardType="numeric"
                        value={this.props.backendStore.backendIp}
                        onChangeText={value =>
                            (this.props.backendStore.backendIp = value)
                        }
                    />
                </Item>
                <Item>
                    <Input
                        style={{ textAlign: "left" }}
                        keyboardType="numeric"
                        value={this.props.backendStore.backendPort}
                        onChangeText={value =>
                            (this.props.backendStore.backendPort = value)
                        }
                    />
                </Item>
                <ModalFilterPicker
                    cancelButtonText="בטל"
                    visible={this.state.citiesVisible}
                    onSelect={value =>
                        (this.props.userStore.user.address.city = value) &&
                        this.setState({ citiesVisible: false })
                    }
                    onCancel={() => this.setState({ citiesVisible: false })}
                    options={this.citiesOptions}
                />
                <ModalFilterPicker
                    cancelButtonText="בטל"
                    visible={this.state.streetsVisible}
                    onSelect={value =>
                        (this.props.userStore.user.address.streetName = value) &&
                        this.setState({ streetsVisible: false })
                    }
                    onCancel={() => this.setState({ streetsVisible: false })}
                    options={this.streetsOptions}
                />
            </NavbarContainer>
        );
    }
}

export default SettigsContainer;
