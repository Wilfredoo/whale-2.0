import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import PhoneInput from "react-native-phone-input";

export default function PhoneInputComponent({}) {
  return (
    <View style={styles.container}>
      <Text>Please put your phone number here</Text>
      {/* <PhoneInput ref="phone" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
