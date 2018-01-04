import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {
    Text,
    Container,
    Content,
    Item,
    Input,
    Label,
    Picker,
    Icon,
    Form
} from "native-base";
import { Actions } from "react-native-router-flux";
import NavbarContainer from "./../NavbarContainer/NavbarContainer";
import DateTimePicker from "react-native-modal-datetime-picker";
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";

import GeneralInfoContainer from "./GeneralInfoContainer";
import AdditionalAttributesContainer from "./AdditionalAttributesContainer";
import LocationPickerContainer from "./LocationPickerContainer";
import TimePickerContainer from "./TimePickerContainer";
import ContactInfoContainer from "./ContactInfoContainer";

const PickerItem = Picker.Item;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height - 170
    },
    marginView: { marginTop: 10 }
});

const labels = [
    "מידע כללי",
    "מיקום האיסוף",
    "מועד האיסוף",
    "הערות נוספות",
    "פרטי איש קשר"
];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013"
};

class FoodGiveawayContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            timeInputValue: "",
            currentPosition: 0
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

    handleSwipeChanged(i) {
        this.setState({ currentPosition: i });
    }

    render() {
        return (
            <Container style={styles.container}>
                <NavbarContainer hasBack title={"מסירת מזון"}>
                    <Content>
                        <View style={styles.marginView} />
                        <StepIndicator
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                        />

                        <Swiper
                            style={styles.container}
                            onIndexChanged={i => this.handleSwipeChanged(i)}
                        >
                            <Content>
                                <GeneralInfoContainer />
                            </Content>
                            <Content>
                                <LocationPickerContainer />
                            </Content>
                            <Content>
                                <TimePickerContainer />
                            </Content>
                            <Content>
                                <AdditionalAttributesContainer />
                            </Content>
                            <Content>
                                <ContactInfoContainer />
                            </Content>
                        </Swiper>
                        {/* <Form>
                            <Item floatingLabel>
                                <Label>פירוט</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>הערות</Label>
                                <Input />
                            </Item>
                            <Picker mode="dropdown" placeholder="Select One">
                                <PickerItem label="ארוז" value="key0" />
                                <PickerItem label="פתוח" value="key1" />
                            </Picker>
                            <Picker mode="dropdown" placeholder="Select One">
                                <PickerItem label="כשר" value="key0" />
                                <PickerItem label="לא כשא" value="key1" />
                            </Picker>
                            <Picker mode="dropdown" placeholder="Select One">
                                <PickerItem label="בקירור" value="key0" />
                                <PickerItem label="לא בקירור" value="key1" />
                            </Picker>
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
                                <Input
                                    disabled
                                    value={this.state.timeInputValue}
                                />
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

                        </Form>*/}
                    </Content>
                </NavbarContainer>
            </Container>
        );
    }
}

export default FoodGiveawayContainer;
