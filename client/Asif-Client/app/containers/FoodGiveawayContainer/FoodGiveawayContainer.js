import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
    Text,
    Container,
    Content,
    Item,
    Input,
    Label,
    Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import DateTimePicker from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    }
});

class FoodGiveawayContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            timeInputValue: ""
        };
    }

    showDateTimePicker() {
        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker() {
        this.setState({ isDateTimePickerVisible: false });
    }

    handleDatePicked(date) {
        this.setState({ timeInputValue: date.toLocaleTimeString("en-GB") });
        this.hideDateTimePicker();
    }

    render() {
        return (
            <Container style={styles.container}>
                <NavbarContainer hasBack title={"מסירת מזון"}>
                    <Content>
                        <Item floatingLabel>
                            <Label>אוכל</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>פירוט</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>
                                מיקום האיסוף
                            </Label>
                            <Input />
                            <Icon active name="navigate" />
                        </Item>
                        <Item
                            floatingLabel
                            onPress={() => this.showDateTimePicker()}
                        >
                            <Label>
                                זמן איסוף מתאים
                            </Label>
                            <Input disabled value={this.state.timeInputValue} />
                            <Icon active name="time" />
                        </Item>
                        <Item floatingLabel>
                            <Label>
                                תמונה
                            </Label>
                            <Input />
                            <Icon active name="camera" />
                        </Item>
                        <DateTimePicker
                            mode="time"
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={date => this.handleDatePicked(date)}
                            onCancel={() => this.hideDateTimePicker()}
                        />
                    </Content>
                </NavbarContainer>
            </Container>
        );
    }
}

export default FoodGiveawayContainer;
