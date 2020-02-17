import React, { Component } from "react";
import { View, StyleSheet, Modal, Text, Button, Image } from "react-native";
import Map from "../map/Map.js";
import NotificationModal from "../notificationModal/NotificationModal.js";
import LocationModal from "../locationModal/LocationModal.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import firebase from "firebase";
import registerForPushNotificationsAsync from "../../helpers/pushToken.js";
import * as IntentLauncher from "expo-intent-launcher";
import calculateCoordinates from "../../helpers/calculateCoordinates.js";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

let whalesLifetime = new Date().getTime() - 48 * 60 * 60 * 1000;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anonymousLocations: null,
      location: { coords: [] },
      notificationsModalVisible: false,
      locationModalVisible: false,
      initialRegionValues: {
        latsDiff: 52,
        longDiff: 13.5,
        maxLatitude: 100,
        maxLongitude: 80,
        minLatitude: 100,
        minLongitude: 30
      }
    };
  }

  async componentDidMount() {
    let permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.granted !== true) {
      this.setState({ locationModalVisible: true });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });

    const tokens = await registerForPushNotificationsAsync();
    if (tokens === "OFF") {
      this.setState({ notificationsModalVisible: true });
    }
    this.setState({
      normal: tokens.token,
      nakedToken: tokens.nakedToken
    });
    // this.executeQueries();
    await this.readAllAnonymousLocations();
  }

  // executeQueries = async () => {
  //   let anonLocations;
  //   let initialRegionValues;

  //   await readAllAnonymousLocations(
  //     this.state.location.coords.latitude,
  //     this.state.location.coords.longitude
  //   );
  //   this.setState(
  //     {
  //       anonymousLocations: anonLocations,
  //       initialRegionValues: initialRegionValues
  //     },
  //     () => {
  //
  //       );
  //     }
  //   );
  // };

  openLocationSettings = () => {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
    );
  };
  openNotificationSettings = () => {
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_SETTINGS);
  };

  sendMyLocationToEveryone = () => {
    firebase
      .database()
      .ref("/locations")
      .child(this.state.nakedToken[1])
      .set({
        nakedToken: this.state.nakedToken[1],
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        created_at: Date.now(),
        order: -Date.now(),
        type: "ocean"
      });
  };

  readAllAnonymousLocations = () => {
    let locations = firebase
      .database()
      .ref("/locations")
      .orderByChild("created_at")
      .startAt(whalesLifetime);

    let myLocation = [];
    myLocation.push(
      this.state.location.coords.latitude,
      this.state.location.coords.longitude
    );
    locations.on("value", snapshot => {
      let anonLocations = [];
      let anonLocationsAndMine = [];

      snapshot.forEach(thing => {
        let oneAnonLocation = [];
        oneAnonLocation.push(
          thing.val().latitude,
          thing.val().longitude,
          thing.val().nakedToken,
          thing.val().created_at
        );
        anonLocations.push(oneAnonLocation);
        anonLocationsAndMine.push(oneAnonLocation);
      });

      anonLocationsAndMine.push(myLocation);

      const initialRegionValues = calculateCoordinates(
        anonLocationsAndMine,
        this.state.location.coords.latitude,
        this.state.location.coords.longitude
      );
      this.setState(
        {
          anonymousLocations: anonLocations,
          initialRegionValues: initialRegionValues
        },
        () => {}
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Map
          location={this.state.location}
          anonymousLocations={this.state.anonymousLocations}
          myToken={this.state.nakedToken}
          initialRegion={this.state.initialRegionValues}
        />
        <MapView.Callout>
          <View style={styles.sonarView}>
            <TouchableOpacity onPress={() => this.sendMyLocationToEveryone()}>
              <MaterialCommunityIcons name="radar" size={100} color={"red"} />
            </TouchableOpacity>
          </View>
        </MapView.Callout>
        <NotificationModal
          notificationsModalVisible={this.state.notificationsModalVisible}
          openNotificationSettings={this.openNotificationSettings}
        />
        <LocationModal
          locationModalVisible={this.state.locationModalVisible}
          openLocationSettings={this.openLocationSettings}
        />
      </View>
    );
  }
}

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
