import React, { Component } from "react";
import { Form, Icon, Input, Item, Text } from "native-base";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react/native";

// TODO add to global styles
const styles = StyleSheet.create({
	mainLabel: { margin: 15, color: "#333333", fontSize: 18 }
});

@observer
class ContactInfoContainer extends Component {
	render() {
		const { giveawayObject } = this.props;
		return (
			<Form>
				<Text style={styles.mainLabel}>
					אנא וודא שפרטי איש הקשר שלך נכונים
				</Text>
				<Item>
					<Input
						placeholder="שם איש הקשר"
						value={giveawayObject.contact.name}
						onChangeText={value =>
							(giveawayObject.contact.name = value)}
					/>
					<Icon name="contact" />
				</Item>
				<Item>
					<Input
						keyboardType="phone-pad"
						placeholder="טלפון"
						value={giveawayObject.contact.phone}
						onChangeText={value =>
							(giveawayObject.contact.phone = value)}
					/>
					<Icon name="call" />
				</Item>
			</Form>
		);
	}
}

export default ContactInfoContainer;
