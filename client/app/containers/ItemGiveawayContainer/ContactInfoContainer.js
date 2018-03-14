import React from "react";
import { Form, Icon, Input, Item, Text } from "native-base";
import { StyleSheet } from "react-native";

// TODO add to global styles
const styles = StyleSheet.create({
	mainLabel: { margin: 15, color: "#333333", fontSize: 18 }
});

const ContactInfoContainer = ({ phone, contact }) => {
	return (
		<Form>
			<Text style={styles.mainLabel}>
				אנא וודא שפרטי איש הקשר שלך נכונים
			</Text>
			<Item>
				<Input placeholder="שם איש הקשר" value={contact} />
				<Icon name="contact" />
			</Item>
			<Item>
				<Input
					keyboardType="phone-pad"
					placeholder="טלפון"
					value={phone}
				/>
				<Icon name="call" />
			</Item>
		</Form>
	);
};

export default ContactInfoContainer;
