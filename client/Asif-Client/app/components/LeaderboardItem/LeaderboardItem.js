import React from "react";
import { StyleSheet } from "react-native";
import { Text, Card, CardItem, Body } from "native-base";
import { Actions } from "react-native-router-flux";
import { Image } from "react-native";
import media from "./../../media";

const styles = StyleSheet.create({
  centerize: {
    alignItems: "center"
  }
});

const LeaderboardItem = ({ data, index, children }) => {
  return (
    <Card>
      <CardItem style={{ alignItems: "center" }} header>
        <Body style={styles.centerize}>
          <Text>ארומה סניף רוטשילד 22</Text>
        </Body>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={media.users.aroma}
          style={{ resizeMode: "stretch", height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem footer>
        <Body style={styles.centerize}>
          <Text>{"#" + (index + 1)}</Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default LeaderboardItem;
