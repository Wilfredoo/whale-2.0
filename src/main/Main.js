import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Map from "../map/Map.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import firebase from "firebase";
import registerForPushNotificationsAsync from "../../helpers/pushToken.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anonymousLocations: null
    };
  }

  async componentDidMount() {
    this.readAllAnonymousLocations();
    const tokens = await registerForPushNotificationsAsync();
    this.setState(
      { normal: tokens.token, nakedToken: tokens.nakedToken },
      () => {}
    );
  }

  sendMyLocationToEveryone = () => {
    firebase
      .database()
      .ref("/locations")
      .child(this.state.nakedToken[1])
      .set({
        latitude: this.props.location.coords.latitude,
        longitude: this.props.location.coords.longitude,
        created_at: Date.now(),
        order: -Date.now(),
        type: "ocean"
      });
  };

  readAllAnonymousLocations = () => {
    let anonLocations = [];
    let locations = firebase
      .database()
      .ref("/locations")
      .orderByChild("order");
    locations.on("value", snapshot => {
      snapshot.forEach(thing => {
        let oneAnonLocation = [];
        oneAnonLocation.push(thing.val().latitude, thing.val().longitude);
        anonLocations.push(oneAnonLocation);
      });
      // console.log("all locations", anonLocations);
      this.setState({ anonymousLocations: anonLocations }, () => {});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Map
          location={this.props.location}
          anonymousLocations={this.state.anonymousLocations}
        />
        <MapView.Callout>
          <View style={styles.sonarView}>
            <TouchableOpacity onPress={() => this.sendMyLocationToEveryone()}>
              <MaterialCommunityIcons name="radar" size={100} color={"red"} />
            </TouchableOpacity>
          </View>
        </MapView.Callout>
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
