import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    token = "OFF";
    return token;
  }

  try {
    let token = await Notifications.getExpoPushTokenAsync();
    let reg = /\[(.*?)\]/;
    let nakedToken = JSON.stringify(token).match(reg);
    return { token, nakedToken };
  } catch (error) {
    console.log("there is an error with push notifications", error);
  }
};
