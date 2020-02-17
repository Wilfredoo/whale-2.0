import React from "react";
import { mapStyle } from "../../helpers/mapStyle.js";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions, Text, View, Image } from "react-native";
import MarkerComponent from "../marker/Marker.js";

function Map(props) {
  function render() {
    const { location, anonymousLocations, myToken, initialRegion } = props;

    return (
      <View style={styles.container}>
        {initialRegion.deltaLat !== undefined &&
          initialRegion.deltaLong !== undefined && (
            <MapView
              customMapStyle={mapStyle}
              showsUserLocation
              initialRegion={{
                latitude: initialRegion.latsDiff,
                longitude: initialRegion.longDiff,
                latitudeDelta: initialRegion.deltaLat,
                longitudeDelta: initialRegion.deltaLong
              }}
              style={styles.mapStyle}
            >
              <MapView.UrlTile urlTemplate="https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=47.61481783906824,-122.38412096178342&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x242f3e&style=element:labels.text.fill%7Ccolor:0x746855&style=element:labels.text.stroke%7Ccolor:0x242f3e&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x263c3f&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x6b9a76&style=feature:road%7Celement:geometry%7Ccolor:0x38414e&style=feature:road%7Celement:geometry.stroke%7Ccolor:0x212a37&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x9ca5b3&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:geometry%7Ccolor:0x746855&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xf3d19c&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xd59563&style=feature:water%7Celement:geometry%7Ccolor:0x17263c&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x515c6d&style=feature:water%7Celement:labels.text.stroke%7Ccolor:0x17263c&size=480x360" />
              {console.log("anon locations", anonymousLocations)}
              {anonymousLocations &&
                anonymousLocations.map(data => {
                  if (data[2] === myToken[1]) {
                    return (
                      <View>
                        <MarkerComponent
                          style={{
                            zIndex: 2
                          }}
                          data={data}
                          color={require("../../assets/yellow-whale.png")}
                          title={"This is you dummy"}
                        />
                      </View>
                    );
                  } else {
                    return (
                      <MarkerComponent
                        style={{ zIndex: 0 }}
                        data={data}
                        color={require("../../assets/blue-whale.png")}
                        title={"Some secretive whale"}
                      />
                    );
                  }
                })}
            </MapView>
          )}
      </View>
    );
  }
  return render();
}
export default Map;

const styles = StyleSheet.create({
  container: {},
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  sonarView: {
    marginBottom: "5%"
  }
});
