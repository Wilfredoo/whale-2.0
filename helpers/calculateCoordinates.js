calculateCoordinates = (data, location) => {
  console.log("location", location);
  console.log("data", data);

  let maxLatitude = -90;
  let minLatitude = 90;
  let maxLongitude = -180;
  let minLongitude = 180;

  data.forEach(element => {
    maxLatitude = Math.max(maxLatitude, element[0]);
    minLatitude = Math.min(minLatitude, element[0]);
    maxLongitude = Math.max(maxLongitude, element[1]);
    minLongitude = Math.min(minLongitude, element[1]);
  });

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  let distance = distanceInKmBetweenEarthCoordinates(
    maxLatitude,
    maxLongitude,
    minLatitude,
    minLongitude
  );
  distance = distance * 2000;

  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos((maxLatitude + minLatitude) / 2),
      Math.cos(angularDistance) -
        Math.sin((maxLatitude + minLatitude) / 2) *
          Math.sin((maxLatitude + minLatitude) / 2)
    )
  );

  // problems: 1 whale was too near and not including my location
  // problems: no whale I think was a strange zoom as well
  let latsDiff = (minLatitude + location.latitude) / 2;
  let longDiff = (minLongitude + location.longitude) / 2;
  // let deltaLat = (maxLatitude - minLatitude) * 1.25;
  // let deltaLong = (maxLongitude - minLongitude) * 1.25;
  let deltaLat = latitudeDelta;
  let deltaLong = longitudeDelta;

  if (data.length === 0) {
    console.log("location...", location);
    latsDiff = location.latitude;
    longDiff = location.longitude;
    deltaLat = 0.8;
    deltaLong = 0.03;
  }

  console.log(
    "no locations only mine",
    latsDiff,
    longDiff,
    deltaLat,
    deltaLong
  );
  return {
    maxLatitude,
    minLatitude,
    maxLongitude,
    minLongitude,
    latsDiff,
    longDiff,
    deltaLat,
    deltaLong
  };
};

export default calculateCoordinates;
