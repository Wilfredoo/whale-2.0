import React from "react";
import { View, Text, StyleSheet, Image, Modal, Button } from "react-native";

export default function NotificationModal({
  notificationsModalVisible,
  openNotificationSettings
}) {
  return (
    <View>
      <Modal visible={notificationsModalVisible}>
        <View style={styles.modal}>
          <Image
            source={require("../../assets/alarmedWhale.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <Text style={styles.modalText}>
            Oh oh, your notifications are disabled, please turn them on so you
            can use the app normally.
          </Text>
          <View style={styles.button}>
            <Button
              color="black"
              title="OK"
              onPress={() => openNotificationSettings()}
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
