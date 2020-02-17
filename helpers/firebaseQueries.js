import firebase from "firebase";

let whalesLifetime = new Date().getTime() - 48 * 60 * 60 * 1000;

export default readAllAnonymousLocations = (myLat, myLong) => {
  let locations = firebase
    .database()
    .ref("/locations")
    .orderByChild("created_at")
    .startAt(whalesLifetime);
  let myLocation = [];
  myLocation.push(myLat, myLong);

  locations.on("value", snapshot => {
    anonLocations = [];
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
    console.log("anon", anonLocations);
    initialRegionValues = calculateCoordinates(anonLocations, myLat, myLong);

    return anonLocations, initialRegionValues;
  });
};
