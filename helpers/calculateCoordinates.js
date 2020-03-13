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

  function distanceInKmBetweenEarthCoordinates(lat1, long1, lat2, long2) {
    const earthRadiusKm = 6371;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLon = degreesToRadians(long2 - long1);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  let distance = distanceInKmBetweenEarthCoordinates(
    maxLatitude,
    maxLongitude,
    minLatitude,
    minLongitude
  );

  let initialLatitude = (minLatitude + maxLatitude) / 2;
  let initialLongitude = (minLongitude + maxLongitude) / 2;
  let latitudeDelta = (maxLatitude - minLatitude) * 1.25;
  let longitudeDelta = (maxLongitude - minLongitude) * 1.25;

  if (data.length === 0) {
    initialLatitude = myLat;
    initialLongitude = myLong;
  }

  if (distance < 1) {
    latitudeDelta = 0.1;
    longitudeDelta = 0.1;
  } else if (distance < 20 && distance > 1) {
    latitudeDelta = (maxLatitude - minLatitude) * 2;
    longitudeDelta = (maxLongitude - minLongitude) * 2;
  } else if (distance > 7100) {
    initialLatitude = myLat;
    initialLongitude = myLong;
    latitudeDelta = (maxLatitude - minLatitude) * 1;
    longitudeDelta = (maxLongitude - minLongitude) * 1;
  }

  return {
    maxLatitude,
    minLatitude,
    maxLongitude,
    minLongitude,
    initialLatitude,
    initialLongitude,
    latitudeDelta,
    longitudeDelta
  };
};

export default calculateCoordinates;
