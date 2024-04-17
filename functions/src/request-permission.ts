export const requestPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted. at firebase server");
      // TODO(developer): Retrieve a registration token for use with FCM.
      // ...
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
};
