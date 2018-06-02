import React, { Component } from 'react';
import { View } from "react-native";
import GiveawayItem from './../GiveawayItem/GiveawayItem';
import { observer } from 'mobx-react/native'
import { List, ListItem, Text, Button, Icon } from 'native-base';
import Constants from "./../../utils/Constants";


@observer class GiveawaysList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { giveaways } = this.props;
        return (
            <View>
             <List >
                <ListItem itemDivider>
                  <Text>מסירות חדשות</Text>
                </ListItem>
                  {giveaways && giveaways.newArr?giveaways.newArr.map((prod,i)=>
                    <GiveawayItem name={prod.name}  status={prod.status} imageUrl={prod.imageUrl} addressString={"הרצליה ינה סנש 21"}>
                    </GiveawayItem>
                  ):null}
                <ListItem itemDivider>
                  <Text>איסוף נקבע</Text>
                </ListItem>
                  {giveaways&&giveaways.pendingArr?giveaways.pendingArr.map((prod,i)=>
                    <GiveawayItem name={prod.name}  status={prod.status} imageUrl={prod.imageUrl} addressString={"הרצליה ינה סנש 21"}>
                    </GiveawayItem>
                ):null}
                <ListItem itemDivider>
                  <Text>נסמרו בהצלחה;ס</Text>
                </ListItem>
                {giveaways&&giveaways.takenArr?giveaways.takenArr.map((prod,i)=>
                <GiveawayItem name={prod.name}  status={prod.status} imageUrl={prod.imageUrl} addressString={"הרצליה ינה סנש 21"}>
                </GiveawayItem>
                ):null}
             </List>     
            </View>
        )
    }
}

export default GiveawaysList;