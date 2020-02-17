import React from "react";
import { View, Text, StyleSheet, Image, Modal, Button } from "react-native";

export default function LocationModal({
  locationModalVisible,
  openLocationSettings
}) {
  return (
    <View>
      <Modal visible={locationModalVisible}>
        <View style={styles.modal}>
          <Image
            source={require("../../assets/alarmedWhale.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text style={styles.modalText}>
            Oh oh, your location seems to be disable, please turn it on so you
            can use the app normally (our app is all about location).
          </Text>
          <View style={styles.button}>
            <Button
              color="black"
              title="OK"
              onPress={() => openLocationSettings()}
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  modalText: {
    textAlign: "center",
    marginBottom: 35,
    marginTop: 20
  },
  button: {
    width: 50
  }
});
