import React, { Component } from "react";
import { Form, Icon, Input, Item, Text } from "native-base";
import { StyleSheet } from "react-native";
import { observer, inject } from "mobx-react/native";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import { Col, Row, Grid } from "react-native-easy-grid";
// TODO add to global styles
const styles = StyleSheet.create({
    mainLabel: { margin: 15, color: "#333333", fontSize: 18 }
});

@inject("userStore")
@observer
class RegisterContainer extends Component {
    render() {
        return (
            <NavbarContainer 
            		title={"עדכון פרטים אישיים"}
            		hasCheck
                    onPressCheck={() => this.props.giveawayStore.postGiveaway()}>
					<Text style={styles.mainLabel}>
						לפני שאנחנו מתחילים, אנא הזן את פרטי הקשר שלך
					</Text>
					<Item>
						<Input
							keyboardType="phone-pad"
							placeholder="טלפון"
							value={this.props.userStore.user.phone}
							onChangeText={value =>
								(this.props.userStore.user.phone = value)}
						/>
						<Icon name="call" />
					</Item>
						<Item>
							<Input
								keyboardType="text"
								placeholder="עיר"
								value={this.props.userStore.user.address.city}
								onChangeText={value =>
									(this.props.userStore.user.address.city = value)}
							/>
						</Item>
						<Item>
							<Input
								keyboardType="text"
								placeholder="רחוב"
								value={this.props.userStore.user.address.streetName}
								onChangeText={value =>
									(this.props.userStore.user.address.streetName = value)}
							/>
						</Item>
	            	<Grid>
					<Col>
						<Item>
						<Input
								keyboardType="number"
								placeholder="דירה "
								value={this.props.userStore.user.address.aptNumber}
								onChangeText={value =>
									(this.props.userStore.user.address.aptNumber = value)}
							/>
						</Item>
					</Col>
	            	<Col>
						<Item>
						<Input
								keyboardType="text"
								placeholder="מספר "
								value={this.props.userStore.user.address.houseNumber}
								onChangeText={value =>
									(this.props.userStore.user.address.houseNumber = value)}
							/>
						</Item>
					</Col>
					</Grid>
			</NavbarContainer>
        );
    }
}

export default RegisterContainer;