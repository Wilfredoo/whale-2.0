import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Button,
  Image,
  Dimensions
} from "react-native";
import Map from "../map/Map.js";
import AuthButton from "../auth/AuthButton.js";
import NotificationModal from "../notificationModal/NotificationModal.js";
import LocationModal from "../locationModal/LocationModal.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import firebase from "firebase";
import registerForPushNotificationsAsync from "../../helpers/pushToken.js";
import * as IntentLauncher from "expo-intent-launcher";
import calculateCoordinates from "../../helpers/calculateCoordinates.js";
import openLocationSettings from "../../helpers/calculateCoordinates.js";
import openNotificationSettings from "../../helpers/calculateCoordinates.js";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Callout } from "react-native-maps";
import { mapStyle } from "../../helpers/mapStyle.js";

let whalesLifetime = new Date().getTime() - 48 * 60 * 60 * 1000;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anonymousLocations: null,
      location: { coords: [] },
      notificationsModalVisible: false,
      locationModalVisible: false,
      viewType: "ocean",
      initialRegionValues: {
        initialLatitude: 52,
        initialLongitude: 13.5,
        maxLatitude: 100,
        maxLongitude: 80,
        minLatitude: 100,
        minLongitude: 30
      }
    };
  }

  async componentDidMount() {
    console.log("props navigate", this.props.navigation);
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
    if (this.state.viewType === "ocean") {
      await this.readAllAnonymousLocations();
    } else {
      console.log("nothing");
      // await this.readLocationsSentToMe();
    }
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

  sendMyLocationToEveryone = () => {
    firebase
      .database()
      // .ref("/locationsT")
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

  switchToOcean = () => {
    this.setState({ viewType: "ocean" });
  };

  switchToSea = () => {
    this.setState({ viewType: "sea" });
  };

  readAllAnonymousLocations = () => {
    let locations = firebase
      .database()
      .ref("/locationsT")
      // .ref("/locations")
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

  readAllAnonymousLocations = () => {
    let locations = firebase
      .database()
      .ref("/locationsT")
      // .ref("/locations")
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
    const {
      location,
      anonymousLocations,
      nakedToken,
      initialRegionValues,
      notificationsModalVisible,
      locationModalVisible,
      openLocationSettings,
      openNotificationSettings
    } = this.state;

    return (
      <View>
        {this.state.viewType === "ocean" && (
          <View style={styles.subContainer}>
            <Map
              location={location}
              anonymousLocations={anonymousLocations}
              myToken={nakedToken}
              initialRegion={initialRegionValues}
            />
            <NotificationModal
              notificationsModalVisible={notificationsModalVisible}
              openNotificationSettings={openNotificationSettings}
            />
            <LocationModal
              locationModalVisible={locationModalVisible}
              openLocationSettings={openLocationSettings}
            />
          </View>
        )}
        <View>
          {this.state.viewType === "sea" && (
            <View>
              <Text>Please sign up to use the sea</Text>
              <AuthButton />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Main;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mapStyle: {
    width: windowWidth,
    height: windowHeight
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
