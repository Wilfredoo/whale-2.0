import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default function AuthButton(props) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <TouchableOpacity
        onPress={() => props.props.navigation.navigate("PhoneInput")}
      >
        <Text>phone input!!!</Text>
      </TouchableOpacity>
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
