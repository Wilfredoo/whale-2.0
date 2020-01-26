import Map from "./src/map/Map";
import History from "./src/history/History";
import Profile from "./src/profile/Profile";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

class AppContainer extends Component {
  render() {
    console.log("app container 2", this.props);
    return (
      <DashboardTabNavigator screenProps={{ someValue: "my name is Juan" }} />
    );
  }
}
export default AppContainer;

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      name: "brent",
      navigationOptions: {
        title: "Profile",
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="fish" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "black",
          inactiveTintColor: "gray"
        }
      }
    },

    Main: {
      screen: Map,
      navigationOptions: {
        tabBarLabel: "Main",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="earth" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "black",
          inactiveTintColor: "gray"
        }
      }
    },
    History: {
      screen: History,
      headerTitle: "aaa",
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="history" size={20} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: "black",
          inactiveTintColor: "gray"
        }
      }
    }
  },

  {
    initialRouteName: "Main",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  },
  {}
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer2 = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
