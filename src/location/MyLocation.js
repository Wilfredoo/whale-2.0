import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Linking,
  ActivityIndicator,
  AppState
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import Main from "../main/Main.js";
import Constants from "expo-constants";

export default class Locatione extends Component {
  state = {
    location: null,
    errorMessage: null,
    isLocationModalVisible: false,
    appState: AppState.currentState
  };

  async componentDidMount() {
    console.log("happen!");
    let permission = await Permissions.askAsync(Permissions.LOCATION);
    console.log("ayayay", permission);

    let location = await Location.getCurrentPositionAsync({});
    console.log("bailando", location);
  }

  // componentWillUnmount() {
  //   AppState.removeEventListener("change", this.handleAppStateChange);
  // }

  // handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     this._getLocationAsync();
  //   }
  //   this.setState({ appState: nextAppState });
  // };

  // componentWillMount() {
  //   AppState.addEventListener("change", this.handleAppStateChange);
  //   if (Platform.OS === "android" && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage:
  //         "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  // _getLocationAsync = async () => {
  //   console.log("lets try this");

  //   try {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== "granted") {
  //       this.setState({
  //         errorMessage: "Permission to access location was denied"
  //       });
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log("location yes", location);
  //     this.setState({ location }, () => {
  //       console.log("cool got the location, location");
  //     });
  //   } catch (error) {
  //     let status = Location.getProviderStatusAsync();
  //     if (!status.locationServicesEnabled) {
  //       this.setState({ isLocationModalVisible: true });
  //     }
  //   }
  // };

  // openSetting = () => {
  //   if (Platform.OS == "ios") {
  //     Linking.openURL("app-settings:");
  //   } else {
  //     IntentLauncher.startActivityAsync(
  //       IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
  //     );
  //   }
  //   this.setState({ openSetting: false });
  // };

  fakeLocation = {
    timestamp: 123123123123,
    mocked: false,
    coords: {
      heading: 0,
      latitude: 52,
      longitude: 13,
      speed: 0,
      altitude: 192,
      accuracy: 17
    }
  };
  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    // return <Main location={this.fakeLocation} />;
    if (this.state.location !== null) {
      return <Main location={this.state.location} />;
    } else {
      return (
        <View style={styles.container}>
          <Text>We are trying to get your location</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});
