import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Constants from "./../../utils/Constants";
import { observer } from "mobx-react/native";
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
    Content,
    Right,
    Spinner,
    ListItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ImagePicker, Permissions } from "expo";
import media from "./../../media";
import firebase from "firebase";
import uuid from "uuid";

const PickerItem = Picker.Item;


@observer
class AmountPicker extends Component {
    render() {
        return (<Grid>
			<Col>
				<Form>
					<Picker
						mode="dropdown"
						placeholder="בחר מידה"
						selectedValue={this.props.unit}
						onValueChange={this.props.onChangeUnitValue}
					>
						<Picker.Item
							label="פריטים"
							value={Constants.AMMOUNT_TYPES.ITEMS}
						/>
						<Picker.Item
							label="ק''ג"
							value={Constants.AMMOUNT_TYPES.KG}
						/>
						<Picker.Item
							label="ליטר"
							value={Constants.AMMOUNT_TYPES.LITRE}
						/>
						<Picker.Item
							label="מנות"
							value={Constants.AMMOUNT_TYPES.PORTIONS}
						/>
					</Picker>
				</Form>
			</Col>
			<Col>
				<Item error={this.props.validationsObject.productAmmount}>
					<Input
						keyboardType="numeric"
						placeholder="כמות *"
						value={this.props.quantity}
						onChangeText={this.props.onChangeQuantityValue}
					/>
					<Icon name="stats" />
				</Item>
			</Col>
		</Grid>)
    }
}
class CameraPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemImage: null,
            uploading: false
        };
    }

    pickImage = async() => {
        try {
            const results = await Promise.all([
                Permissions.askAsync(Permissions.CAMERA_ROLL),
                Permissions.askAsync(Permissions.CAMERA)
            ]);
            if (results.some(({ status }) => status !== "granted")) {
                alert("no permissions to camera");
            } else {
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3]
                });

                this.handleImagePicked(result);
            }
        } catch (e) {
            console.log("erorr", e);
        }
    };

    handleImagePicked = async pickerResult => {
        let uploadUrl;
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                uploadUrl = await this.uploadImageAsync(pickerResult.uri);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            this.setState({ itemImage: uploadUrl });
            this.setState({ uploading: false });

            if (this.props.productObject && uploadUrl) {
                this.props.productObject.imageUrl = uploadUrl;
            }
        }
    };

    uploadImageAsync = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child("products/" + uuid.v4());

        const snapshot = await ref.put(blob);
        const downloadUrl = snapshot.ref.getDownloadURL();
        return downloadUrl;
    };

    render() {
        return (
            <View>
				{this.state.uploading
					? <Spinner />
					: <TouchableOpacity onPress={this.pickImage}>
							{!this.state.itemImage
								? <Thumbnail
										large
										source={media.colors.lightgrey}
									/>
								: <Thumbnail
										large
										source={{ uri: this.state.itemImage }}
									/>}
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
						</TouchableOpacity>}
			</View>
        );
    }
}

@observer
class GeneralInfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: "",
            itemState: undefined,
            itemPicture: undefined,
            itemUnit: Constants.AMMOUNT_TYPES.ITEMS,
            itemQuantity: undefined,
            itemDescription: ""
        };
    }

    onChangeUnitValue(val) {
        this.props.productObject.amount.units = val;
    }

    onChangeQuantityValue(val) {
        this.props.productObject.amount.amount = val;
    }

    onChangeCheckbox(val) {
        this.props.productObject.kosher = val;
        console.log(val);
    }

    render() {
        let { productObject } = this.props;
        return (
            <Form style={{ alignItems: "center" }}>
				<CameraPicker productObject={productObject} />
				<Item error={this.props.validationsObject.productName} floatingLabel style={{ marginLeft: 35, marginRight: 35 }}>
					<Label
						style={{
							includeFontPadding: false,
							textAlign: "center"
						}}
					>
						שם  הפריט*	
					</Label>
					<Input 
						value={productObject.name}
						style={{
							includeFontPadding: false,
							textAlign: "center",
							fontSize: 24
						}}
						onChangeText={value => (productObject.name = value)}
					/>
				</Item>
				<Content style={{ marginTop: 20, width: 250 }}>
					<Item>
						<Input
							value={productObject.description}
							onChangeText={value =>
								(productObject.description = value)}
							placeholder="תיאור:  'חדש באריזה'"
						/>
						<Icon name="paper" />
					</Item>
					<AmountPicker
						validationsObject={this.props.validationsObject}
						unit={productObject.amount.units}
						quantity={productObject.amount.amount}
						onChangeUnitValue={this.onChangeUnitValue.bind(this)}
						onChangeQuantityValue={this.onChangeQuantityValue.bind(
							this
						)}
					/>
					<Item style={{ height: 50 }}>
						<CheckBox
							checked={productObject.requiresCool}
							onPress={() =>
								(productObject.requiresCool = !productObject.requiresCool)}
						/>
						<Right>
							<Text>דורש קירור</Text>
						</Right>
					</Item>
					<Item style={{ height: 50 }}>
						<CheckBox
							checked={productObject.kosher}
							onPress={() =>
								(productObject.kosher = !productObject.kosher)}
						/>
						<Right>
							<Text>כשר</Text>
						</Right>
					</Item>
					<Item style={{ height: 50 }}>
						<CheckBox
							checked={productObject.packed}
							onPress={() =>
								(productObject.packed = !productObject.packed)}
						/>
						<Right>
							<Text>ארוז</Text>
						</Right>
					</Item>
					<Item style={{ height: 50 }}>
						<CheckBox
							checked={productObject.immediateUse}
							onPress={() =>
								(productObject.immediateUse0 = !productObject.immediateUse0)}
						/>
						<Right>
							<Text>פג תוקף בקרוב</Text>
						</Right>
					</Item>
				</Content>
			</Form>
        );
    }
}

export default GeneralInfoContainer;