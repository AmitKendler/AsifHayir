import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, ListItem, Text, Left, Radio } from "native-base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const styles = StyleSheet.create({
	transparentBg: { backgroundColor: "transparent" },
	mainLabel: { margin: 15, color: "#333333", fontSize: 18 }
});

class TimePickerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderOneChanging: false,
			multiSliderValue: [18, 19],
			isSpecificTimeSelected: false
		};
	}

	multiSliderValuesChange(values) {
		this.setState({
			multiSliderValue: values
		});
	}

	mapSliderValToHour(val) {
		return val % 1 !== 0 ? parseInt(val) + ":30" : parseInt(val) + ":00";
	}

	toggleSpecificTime() {
		this.setState({
			isSpecificTimeSelected: !this.state.isSpecificTimeSelected
		});
	}

	render() {
		return (
			<Content>
				<Text style={styles.mainLabel}>
					מתי הניידת איסוף שלנו תוכל לאסוף את התכולה?
				</Text>
				<ListItem style={styles.transparentBg}>
					<Left>
						<Radio
							selected={!this.state.isSpecificTimeSelected}
							onPress={this.toggleSpecificTime.bind(this)}
						/>
					</Left>
					<Text>כל היום</Text>
				</ListItem>
				<ListItem style={styles.transparentBg}>
					<Left>
						<Radio
							selected={this.state.isSpecificTimeSelected}
							onPress={this.toggleSpecificTime.bind(this)}
						/>
					</Left>
					<Text>טווח זמן ספציפי</Text>
				</ListItem>
				<Content contentContainerStyle={{ alignItems: "center" }}>
					<Text
						style={{
							color: this.state.isSpecificTimeSelected
								? "black"
								: "grey",
							margin: 20
						}}
					>
						{this.mapSliderValToHour(
							this.state.multiSliderValue[0]
						)}
						{"-"}
						{this.mapSliderValToHour(
							this.state.multiSliderValue[1]
						)}
					</Text>
					<MultiSlider
						enabledOne={this.state.isSpecificTimeSelected}
						enabledTwo={this.state.isSpecificTimeSelected}
						values={[
							this.state.multiSliderValue[0],
							this.state.multiSliderValue[1]
						]}
						sliderLength={280}
						onValuesChange={this.multiSliderValuesChange.bind(this)}
						min={14}
						max={21}
						step={0.5}
						allowOverlap
						snapped
					/>
				</Content>
			</Content>
		);
	}
}

export default TimePickerContainer;
