import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthButton from "../auth/AuthButton.js";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <AuthButton />
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
