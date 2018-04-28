import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { observer, inject } from "mobx-react/native";
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
import StepIndicator from "react-native-step-indicator";
import Swiper from "react-native-swiper";
import FoodProductContainer from "./FoodProductContainer";
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

@inject("giveawayStore")
@inject("userStore")
@observer
class ItemGiveawayContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: 0,
            isCheckAvailable: false
        };
    }

    componentDidMount() {
        // Set store params to default
        try {
            this.props.giveawayStore.giveaway.contact.name = this.props.contact;
            this.props.giveawayStore.giveaway.contact.phone = this.props.phone;
            this.props.giveawayStore.product.prodType = this.props.prodType;
            this.props.giveawayStore.giveaway.userId = this.props.userStore.user._id;
        } catch (e) {
            console.log(e, this.props);
        }
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
        const { product, giveaway } = this.props.giveawayStore;
        return (
            <Container style={styles.container}>
                <NavbarContainer
                    hasBack
                    title={this.props.title}
                    hasNext={!this.state.isCheckAvailable}
                    onPressNext={this.moveNext.bind(this)}
                    hasCheck={this.state.isCheckAvailable}
                    onPressCheck={() => this.props.giveawayStore.postGiveaway()}
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
                                {
                                    <FoodProductContainer
                                        productObject={product}
                                    />
                                }
                            </Content>
                            <Content>
                                <LocationPickerContainer
                                    giveawayObject={giveaway}
                                    address={this.props.address}
                                />
                            </Content>
                            <Content>
                                <TimePickerContainer
                                    giveawayObject={giveaway}
                                />
                            </Content>
                            <Content>
                                <ContactInfoContainer
                                    giveawayObject={giveaway}
                                />
                            </Content>
                        </Swiper>
                    </Content>
                </NavbarContainer>
            </Container>
        );
    }
}

export default ItemGiveawayContainer;
