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

const labels = ["מידע כללי", "מיקום האיסוף", "מועד האיסוף", "פרטי איש קשר"];

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "rgb(64,56,115)",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "rgb(64,56,115)",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "rgb(64,56,115)",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "rgb(99,93,183)",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "rgb(64,56,115)",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#rgb(99,93,183)"
};

class FoodGiveawayContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            timeInputValue: "",
            currentPosition: 0,
            isCheckAvailable: false
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
        this.setState({
            currentPosition: i,
            isCheckAvailable: i === 3 ? true : false
        });
    }

    moveNext() {
        this.refs.mySwiper.scrollBy(1);
    }

    moveStep(i) {
        this.refs.mySwiper.scrollBy(i - this.state.currentPosition);
    }

    render() {
        return (
            <Container style={styles.container}>
                <NavbarContainer
                    hasBack
                    title={"מסירת מזון"}
                    hasNext={!this.state.isCheckAvailable}
                    onPressNext={this.moveNext.bind(this)}
                    hasCheck={this.state.isCheckAvailable}
                    onPressCheck={() => alert("ok!")}
                >
                    <Content>
                        <View style={styles.marginView} />
                        <StepIndicator
                            stepCount={4}
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                            onPress={this.moveStep.bind(this)}
                        />

                        <View style={styles.marginView} />
                        <Swiper
                            showsPagination={false}
                            scrollEnabled={false}
                            ref="mySwiper"
                            activeDotColor="rgb(64,56,115)"
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
