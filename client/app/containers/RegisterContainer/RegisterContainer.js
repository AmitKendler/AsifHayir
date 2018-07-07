import React, { Component } from "react";
import { Form, Icon, Input, Item, Text, Picker } from "native-base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react/native";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
import cities from "./../../utils/cities";
import streets from "./../../utils/streets";
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
@observer
class RegisterContainer extends Component {
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
    return (
      <NavbarContainer
        title={"עדכון פרטים אישיים"}
        hasCheck
        onPressCheck={() => this.props.userStore.loginWithToken()}
      >
        <Text style={styles.mainLabel}>
          לפני שאנחנו מתחילים, אנא הזן את פרטי הקשר שלך
        </Text>
        <Item>
          <Input
            style={{ textAlign: "right" }}
            keyboardType="phone-pad"
            placeholder="טלפון"
            value={this.props.userStore.registerUser.phone}
            onChangeText={value =>
              (this.props.userStore.registerUser.phone = value)
            }
          />
          <Icon name="call" />
        </Item>
        <Item onPress={() => this.setState({ citiesVisible: true })}>
          <Input
            disabled
            placeholder="עיר"
            value={this.props.userStore.registerUser.address.city}
          />
        </Item>
        <Item onPress={() => this.setState({ streetsVisible: true })}>
          <Input
            disabled
            placeholder="רחוב"
            value={this.props.userStore.registerUser.address.streetName}
          />
        </Item>
        <Grid>
          <Col>
            <Item>
              <Input
                style={{ textAlign: "right" }}
                keyboardType="numeric"
                placeholder="דירה "
                value={this.props.userStore.registerUser.address.aptNumber.toString()}
                onChangeText={value =>
                  (this.props.userStore.registerUser.address.aptNumber = value.toString())
                }
              />
            </Item>
          </Col>
          <Col>
            <Item>
              <Input
                style={{ textAlign: "right" }}
                placeholder="מספר "
                value={this.props.userStore.registerUser.address.houseNumber}
                onChangeText={value =>
                  (this.props.userStore.registerUser.address.houseNumber = value)
                }
              />
            </Item>
          </Col>
        </Grid>
        <ModalFilterPicker
          cancelButtonText="בטל"
          visible={this.state.citiesVisible}
          onSelect={value =>
            (this.props.userStore.registerUser.address.city = value) &&
            this.setState({ citiesVisible: false })
          }
          onCancel={() => this.setState({ citiesVisible: false })}
          options={this.citiesOptions}
        />
        <ModalFilterPicker
          cancelButtonText="בטל"
          visible={this.state.streetsVisible}
          onSelect={value =>
            (this.props.userStore.registerUser.address.streetName = value) &&
            this.setState({ streetsVisible: false })
          }
          onCancel={() => this.setState({ streetsVisible: false })}
          options={this.streetsOptions}
        />
      </NavbarContainer>
    );
  }
}

export default RegisterContainer;
