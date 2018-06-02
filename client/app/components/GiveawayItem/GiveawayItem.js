 import React from "react";
 import { View } from "react-native";
 import {
     Content,
     List,
     ListItem,
     Left,
     Body,
     Right,
     Thumbnail,
     Text,
     Icon
 } from "native-base";
 import {
     Actions
 } from "react-native-router-flux";
 import Constants from "./../../utils/Constants";

 const GiveawayItem = ({
     name,
     imageUrl,
     addressString,
     status,
     index,
     children
 }) => {
     return (
         <ListItem>
      <Left> 
        <Thumbnail size={95}
          source={{
            uri:
            imageUrl
          }}
        />
      </Left>
      <Body>
        <Text>
        {name}
        </Text>
        <Text note>{addressString}</Text>
      </Body>
        <Right>
         {(status === Constants.STATUSES.NEW)?
          <View  style={{ alignSelf: "center" }}>      
              <Text note>ממתין  </Text>
              <Icon name="clock" style={{ color: "grey" }} />
          </View>:null}
              {(status === Constants.STATUSES.PENDING)?
          <View  style={{ alignSelf: "center" }}>      
              <Text note>איסוף נקבע</Text>
              <Icon name="checkmark" style={{ color: "green" }} />
          </View>:null}
           {(status === Constants.STATUSES.TAKEN)?
          <View  style={{ alignSelf: "center" }}>      
              <Text note>נלקח </Text>
              <Icon name="done-all" style={{ color: "green" }} />
          </View>:null}
        </Right>
    </ListItem>
     );
 };

 export default GiveawayItem;