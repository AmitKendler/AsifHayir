import React, { Component } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Text, Content, Button, Icon, Item, Input } from "native-base";
import { Constants, MapView, Location, Permissions } from "expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { observer } from "mobx-react/native";

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
	state = {
		location: null,
		errorMessage: null,
		mapRegion: null,
		lastLat: null,
		lastLong: null,
		itemLocation: { latitude: 0, longitude: 0 }
	};

	componentWillMount() {
		if (Platform.OS === "android" && !Constants.isDevice) {
			this.setState({
				errorMessage:
					"Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
			});
		} else {
			if (this.props.giveawayObject.address.location) {
			} else {
				this.getLocationAsync();
			}
		}
	}

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			this.setState({
				errorMessage: "Permission to access location was denied"
			});
		}

		let location = await Location.getCurrentPositionAsync({});

		this.changeLocation(
			location.coords.latitude,
			location.coords.longitude
		);
	};

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
			<Content>
				<GooglePlacesAutocomplete
					placeholder="חפש מיקום"
					minLength={2}
					autoFocus={false}
					returnKeyType={"search"}
					fetchDetails={true}
					onPress={(data, details = null) => {
						let location = details.geometry.location;
						this.changeLocation(location.lat, location.lng);
					}}
					ref={instance => {
						this.locationRef = instance;
					}}
					query={{
						key: "AIzaSyC2QhtACfVZ2cr9HVvxQuzxd3HT36NNK3Q",
						language: "he",
						types: "address"
					}}
					styles={{
						description: {
							fontWeight: "bold"
						},
						predefinedPlacesDescription: {
							color: "#1faadb"
						},
						powered: null
					}}
				/>
				{
				    /*<Input placeholder="עיר" />
				    				<Input placeholder="רחוב" />
				    				<Input placeholder="מס' בית" />
				    				<Input placeholder="דירה" /> */
				}
				<MapView
					region={this.state.mapRegion}
					onRegionChange={this.onRegionChange.bind(this)}
					style={styles.mapStyle}
				>
					<MapView.Marker
						title="גרור כדי לשנות"
						draggable
						coordinate={this.state.itemLocation}
						onDragEnd={e => {
							const coords = e.nativeEvent.coordinate;
							this.changeLocation(
								coords.latitude,
								coords.longitude
							);
							this.setState({
								itemLocation: coords
							});
						}}
					/>
				</MapView>
				<Button
					onPress={this.getLocationAsync.bind(this)}
					style={styles.locationButton}
				>
					<Icon name="locate" style={{ color: "#333333" }} />
				</Button>
			</Content>
		);
	}
}

export default LocationPickerContainer;
