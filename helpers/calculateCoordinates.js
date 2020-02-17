calculateCoordinates = (data, myLat, myLong) => {
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

  if (distance < 1) {
    distance = 1;
  }

  if (distance > 3000) {
    distance = distance * 1000;
  } else {
    distance = distance * 2000;
  }
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

  let latsDiff;
  let longDiff;
  if (distance > 3000000) {
    console.log("distance is too far");
    latsDiff = myLat;
    longDiff = myLong;
  } else {
    console.log("not that far");
    latsDiff = (minLatitude + myLat) / 2;
    longDiff = (minLongitude + myLong) / 2;
  }

  // let latsDiff = (minLatitude + myLat) / 2;
  // let longDiff = (minLongitude + myLong) / 2;
  // let deltaLat = (maxLatitude - minLatitude) * 1.25;
  // let deltaLong = (maxLongitude - minLongitude) * 1.25;
  let deltaLat = latitudeDelta;
  let deltaLong = longitudeDelta;

  console.log("deltas", deltaLat, deltaLong);
  if (data.length === 0) {
    latsDiff = myLat;
    longDiff = myLong;
    deltaLat = 0.8;
    deltaLong = 0.03;
  }

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
