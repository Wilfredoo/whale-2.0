import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AuthButton({}) {
  return (
    <View>
      <Button onClick={() => this.props.navigation.navigate("PhoneInput")}>
        Sign Up
      </Button>
    </View>
  );
}
