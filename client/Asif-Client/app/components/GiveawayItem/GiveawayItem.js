import React from "react";
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
import { Actions } from "react-native-router-flux";

const GiveawayItem = ({ data, index, children }) => {
  return (
    <ListItem>
      <Left>
        <Thumbnail
          source={{
            uri:
              "http://www.100cal.co.il/CreateTumbImage.aspx?width=428&height=300&path=/Portals/0/ProductImages/br-m98313-s00000-a-Taubread-s-WS.JPG"
          }}
        />
      </Left>
      <Body>
        <Text>100 פיתות באריזה חדשה</Text>
        <Text note>חנה סנש 21, הרצליה </Text>
      </Body>
      <Right>
        <Text note>איסוף בשעה</Text>
        <Text note>3:43 pm</Text>
        <Icon name="checkmark" style={{ color: "green" }} />
      </Right>
    </ListItem>
  );
};

export default GiveawayItem;
