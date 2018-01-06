import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Text,
  Item,
  Input,
  Picker,
  Form,
  Thumbnail,
  Icon,
  Label,
  CheckBox,
  Content
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ImagePicker } from "expo";
import media from "./../../media";
const PickerItem = Picker.Item;

class CameraPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemImage: null
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ itemImage: result.uri });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.pickImage}>
        {!this.state.itemImage
          ? <Thumbnail large source={media.colors.lightgrey} />
          : <Thumbnail large source={{ uri: this.state.itemImage }} />}
        {!this.state.itemImage &&
          <Icon
            style={{
              color: "#fff",
              top: 24,
              fontSize: 34,
              left: 26,
              position: "absolute"
            }}
            name="camera"
          />}
      </TouchableOpacity>
    );
  }
}

const AmountPicker = ({
  quantity,
  unit,
  onChangeUnitValue,
  onChangeQuantityValue
}) => {
  return (
    <Grid>
      <Col>
        <Form>
          <Picker
            mode="dropdown"
            placeholder="בחר מידה"
            selectedValue={unit}
            onValueChange={onChangeUnitValue}
          >
            <Picker.Item label="פריטים" value="key0" />
            <Picker.Item label="ק''ג" value="key1" />
            <Picker.Item label="ליטר" value="key2" />
            <Picker.Item label="מנות" value="key3" />
          </Picker>
        </Form>
      </Col>
      <Col>
        <Item>
          <Input
            keyboardType="numeric"
            placeholder="כמות"
            value={quantity}
            onChangeText={onChangeQuantityValue}
          />
          <Icon name="stats" />
        </Item>
      </Col>
    </Grid>
  );
};

class GeneralInfoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: " ",
      itemState: undefined,
      itemPicture: undefined,
      itemUnit: "key0",
      itemQuantity: undefined,
      itemDescription: ""
    };
  }

  onChangeUnitValue(val) {
    this.setState({
      itemUnit: val
    });
  }

  onChangeQuantityValue(val) {
    this.setState({
      itemQuantity: val
    });
  }

  render() {
    return (
      <Form style={{ alignItems: "center" }}>
        <CameraPicker />
        <Item floatingLabel style={{ marginLeft: 35, marginRight: 35 }}>
          <Label style={{ includeFontPadding: false, textAlign: "center" }}>
            שם הפריט
          </Label>
          <Input
            value={this.state.itemName}
            style={{
              includeFontPadding: false,
              textAlign: "center",
              fontSize: 24
            }}
            onChangeText={value => this.setState({ itemName: value })}
          />
        </Item>
        <Content style={{ marginTop: 20, width: 250 }}>
          <Item>
            <Input
              value={this.state.itemDescription}
              onChangeText={value => this.setState({ itemDescription: value })}
              placeholder="תיאור: לדוג' : חדש באריזה"
            />
            <Icon name="paper" />
          </Item>
          <AmountPicker
            unit={this.state.itemUnit}
            quantity={this.state.itemQuantity}
            onChangeUnitValue={this.onChangeUnitValue.bind(this)}
            onChangeQuantityValue={this.onChangeQuantityValue.bind(this)}
          />
        </Content>
      </Form>
    );
  }
}

export default GeneralInfoContainer;
