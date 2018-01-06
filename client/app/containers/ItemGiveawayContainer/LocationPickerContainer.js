import React, { Component } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Text, Content, Button, Icon, Item, Input } from "native-base";
import { Constants, MapView, Location, Permissions } from "expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const styles = StyleSheet.create({
	locationButton: {
		position: "absolute",
		marginTop: 70,
		marginLeft: 5,
		backgroundColor: "rgba(255,255,255,0.4)"
	},
	mapStyle: {
		flex: 1,
		height: Dimensions.get("window").height - 100,
		width: Dimensions.get("window").width
	},
	searchBarStyle: {
		margin: 10
	}
});

class GeneralInfoContainer extends Component {
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
			this.getLocationAsync();
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
				<MapView
					region={this.state.mapRegion}
					onRegionChange={this.onRegionChange.bind(this)}
					style={styles.mapStyle}
				>
					<MapView.Marker
						title="גרור כדי לשנות"
						draggable
						coordinate={this.state.itemLocation}
						onDragEnd={e =>
							this.setState({
								itemLocation: e.nativeEvent.coordinate
							})}
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

export default GeneralInfoContainer;
