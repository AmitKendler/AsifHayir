import React, { Component } from "react";
import { Form, Icon, Input, Item, Text } from "native-base";
import { StyleSheet } from "react-native";
import { observer, inject } from "mobx-react/native";

// TODO add to global styles
const styles = StyleSheet.create({
    mainLabel: { margin: 15, color: "#333333", fontSize: 18 }
});

@inject("userStore")
@observer
class RegisterContainer extends Component {
    render() {
        return (
            <Form>
				<Text style={styles.mainLabel}>
					אנא וודא שפרטי איש הקשר שלך נכונים
				</Text>
				<Item>
					<Input
						placeholder="שם איש הקשר"
						value={this.props.userStore.contact.name}
						onChangeText={value =>
							(giveawayObject.name = value)}
					/>
					<Icon name="contact" />
				</Item>
				<Item>
					<Input
						keyboardType="phone-pad"
						placeholder="טלפון"
						value={this.props.userStore.contact.name}
						onChangeText={value =>
							(giveawayObject.contact.phone = value)}
					/>
					<Icon name="call" />
				</Item>
			</Form>
        );
    }
}

export default RegisterContainer;