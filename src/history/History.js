import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import AuthButton from "../auth/AuthButton.js";

export default function History(props) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <AuthButton props={props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
