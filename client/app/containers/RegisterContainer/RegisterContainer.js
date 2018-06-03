import React, { Component } from "react";
import { Form, Icon, Input, Item, Text, Picker } from "native-base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react/native";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
import cities from "./../../utils/cities";
import streets from "./../../utils/streets";
import AutoSuggest from 'react-native-autosuggest'

// TODO add to global styles
const styles = StyleSheet.create({
    mainLabel: { margin: 15, color: "#333333", fontSize: 18 },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    }
});


@inject("userStore")
@observer
class RegisterContainer extends Component {
    render() {
        return (
            <NavbarContainer 
                title={"עדכון פרטים אישיים"} 
                hasCheck
                    onPressCheck={() => this.props.userStore.loginWithToken()}>
                    <Text style={styles.mainLabel}>
            לפני שאנחנו מתחילים, אנא הזן את פרטי הקשר שלך
          </Text>
          <Item>
            <Input
              style={{textAlign:'right'}}
              keyboardType="phone-pad"
              placeholder="טלפון"
              value={this.props.userStore.registerUser.phone}
              onChangeText={value =>
                (this.props.userStore.registerUser.phone = value)}
            />
            <Icon name="call" />
          </Item>
      <Form>
            <Picker
              mode="dialog"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="עיר"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.props.userStore.registerUser.address.city}
              onValueChange={value=>this.props.userStore.registerUser.address.city = value}
            >
              { cities.cities.map((city)=><Picker.Item label={city} value={city} />) }
            </Picker>
              <Picker
              mode="dialog"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              placeholder="רחוב"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: undefined }}
              selectedValue={this.props.userStore.registerUser.address.streetName}
              onValueChange={value=>this.props.userStore.registerUser.address.streetName = value}
            >
              { streets.streets.map((street)=><Picker.Item label={street} value={street} />) }
            </Picker>
          </Form>
          <Grid>
          <Col>
            <Item>
            <Input
                style={{textAlign:'right'}}
                keyboardType="numeric"
                placeholder="דירה "
                value={this.props.userStore.registerUser.address.aptNumber.toString()}
                onChangeText={value =>
                  (this.props.userStore.registerUser.address.aptNumber = value.toString())}
              />
            </Item>
          </Col>
           <Col>
            <Item>
            <Input
                style={{textAlign:'right'}}
                placeholder="מספר "
                value={this.props.userStore.registerUser.address.houseNumber}
                onChangeText={value =>
                  (this.props.userStore.registerUser.address.houseNumber = value)}
              />
            </Item>
          </Col>
          </Grid>
      </NavbarContainer>
        );
    }
}

export default RegisterContainer;