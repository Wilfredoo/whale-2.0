import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

getLocationAsync = async () => {
  try {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    return location;
  } catch (error) {
    console.log("error in location", error);
    return false;
  }
};

getLocationPermissions = async => {
  let { status } = Permissions.askAsync(Permissions.LOCATION);

  if (status === "granted") {
    return true;
  } else {
    console.log("status is not granted for location", status);

    return false;
  }
};

getProviderStatusAsync = async => {
  let status = Location.getProviderStatusAsync();
  return status.locationServicesEnabled;
};

export default getLocationAsync;
// export getLocationPermissions;
// export getProviderStatusAsync;
