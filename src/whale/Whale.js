import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

export default function Whale({ repos, openRepo }) {
  return (
    <View>
      <Marker
        coordinate={{
          latitude: data[1],
          longitude: data[2]
        }}
        title={"Whale Offices"}
        description={"Whale is a serious corporation."}
      >
        <Image
          source={require("../../assets/blue-whale.png")}
          style={{ width: 35, height: 35 }}
          resizeMode="contain"
        />
      </Marker>
      ;
    </View>
  );
}

const styles = StyleSheet.create({});
