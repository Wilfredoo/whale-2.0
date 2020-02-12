import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
import { Marker } from "react-native-maps";

export default function MarkerComponent({ data, color, title }) {
  return (
    <View>
      <Marker
        coordinate={{
          latitude: data[0],
          longitude: data[1]
        }}
        title={title}
        description={moment(data[3]).fromNow()}
      >
        <Image
          source={color}
          style={{ width: 35, height: 35 }}
          resizeMode="contain"
        />
      </Marker>
    </View>
  );
}

const styles = StyleSheet.create({});
