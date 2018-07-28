import React, { Component } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Text, Content, Button, Icon, Item, Input } from "native-base";
import { Constants, MapView, Location, Permissions } from "expo";
import { observer } from "mobx-react/native";
import cities from "./../../utils/cities";
import streets from "./../../utils/streets";
import { Col, Row, Grid } from "react-native-easy-grid";
import ModalFilterPicker from "react-native-modal-filter-picker";
import Geocoder from 'react-native-geocoding';

// to do only once
Geocoder.init('AIzaSyCHI4WmklIfn1tml_m5mOSxiUM9IKz01n4'); // use a valid API key


const styles = StyleSheet.create({
    locationButton: {
        position: "absolute",
        marginTop: 70,
        marginLeft: 5,
        backgroundColor: "rgba(255,255,255,0.4)"
    },
    mapStyle: {
        flex: 1,
        height: 200,
        width: Dimensions.get("window").width
    },
    searchBarStyle: {
        margin: 10
    }
});

@observer
class LocationPickerContainer extends Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            location: null,
            errorMessage: null,
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            itemLocation: { latitude: 0, longitude: 0 },
            citiesVisible: false,
            streetsVisible: false,
            invalidLocation: true
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

    componentDidMount() {
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                errorMessage: "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            });
        } else {
            this.updateLocation();
        }
    }

    changeLocation(lat, long) {
        if (!this.props.giveawayObject.address.location) {
            this.props.giveawayObject.address.location = {
                type: "Point",
                coordinates: [lat, long]
            };
        } else {
            this.props.giveawayObject.address.location.coordinates = [
                lat,
                long
            ];
        }

        let region = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        };

        this.onRegionChange(region, region.latitude, region.longitude);
    }

    updateLocation() {
        console.log("updating location.....");
        let address = this.props.giveawayObject.address;
        if (address.city && address.streetName) {
            let addressString = `${address.city} ${address.streetName} ${address.houseNumber} ${address.aptNumber}`;
            console.log("geocoding location...", addressString)
            Geocoder.from(addressString)

                .then(json => {
                    var location = json.results[0].geometry.location;
                    this.changeLocation(
                        location.lat,
                        location.lng
                    );

                    this.setState({ invalidLocation: false });
                })
                .catch(error => this.setState({ invalidLocation: true }));
        }
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong,
            itemLocation: { latitude: lastLat, longitude: lastLong }
        });
    }

    render() {
        return (
            <Grid>
				<Row>
						<MapView pitchEnabled={false}
							region={this.state.mapRegion}
							style={styles.mapStyle}
						>
							<MapView.Marker
								title="גרור כדי לשנות"
								coordinate={this.state.itemLocation}
							/>
						</MapView>
				</Row>
				<Row>
					<Col>
						<Item
							onPress={() =>
								this.setState({ citiesVisible: true })
							}
						>
							<Input
								disabled
								placeholder="עיר "
								value={this.props.giveawayObject.address.city}
							/>
						</Item>
						<Item
							onPress={() =>
								this.setState({ streetsVisible: true })
							}
						>
							<Input
								disabled
								placeholder="רחוב "
								value={
									this.props.giveawayObject.address.streetName
								}
							/>
						</Item>

						<Grid>
							<Col>
								<Item>
									<Input
										style={{ textAlign: "right" }}
										keyboardType="numeric"
										placeholder="דירה "
										value={this.props.giveawayObject.address.aptNumber.toString()}
										onChangeText={value =>
											(this.props.giveawayObject.address.aptNumber = value.toString()) && this.updateLocation()
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
											this.props.giveawayObject.address
												.houseNumber
										}
										onChangeText={value =>
											(this.props.giveawayObject.address.houseNumber = value) && this.updateLocation()
										}
									/>
								</Item>
							</Col>
						</Grid>
					
						<ModalFilterPicker
							cancelButtonText="בטל"
							visible={this.state.citiesVisible}
							onSelect={value =>
								(this.props.giveawayObject.address.city = value) &&
								this.setState({ citiesVisible: false }) && this.updateLocation()
							}
							onCancel={() =>
								this.setState({ citiesVisible: false })
							}
							options={this.citiesOptions}
						/>
						<ModalFilterPicker
							cancelButtonText="בטל"
							visible={this.state.streetsVisible}
							onSelect={value =>
								{
								this.props.giveawayObject.address.streetName = value;
								this.setState({ streetsVisible: false });
								this.updateLocation()
								}
							}
							onCancel={() =>
								this.setState({ streetsVisible: false })
							}
							options={this.streetsOptions}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						{this.state.invalidLocation?<Button full iconLeft light danger><Text>מיקום לא תקין </Text><Icon name='warning' /></Button>:null}
					</Col>
				</Row>
			</Grid>
        );
    }
}

export default LocationPickerContainer;