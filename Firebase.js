import { Alert, AppState, Platform } from "react-native"
import Firebase from "react-native-firebase"
import _ from "lodash"

const isAndroid = Platform.OS === "android"

export const buildNotification = (data) => {
  const title = isAndroid ? "Flight Reminder" : "";
  const notification = new Firebase.notifications.Notification()
    .setNotificationId("FlightInfo")
    .setTitle(title)
    .setBody(`Your flight ${data.flight[0].no} is estimated to arrive at ${data.status} local time.`) 
    .android.setPriority(Firebase.notifications.Android.Priority.High) // set priority in Android
    .android.setChannelId("FlightReminder") // should be the same when creating channel for Android
    .android.setAutoCancel(true); // To remove notification when tapped on it
    return notification;
}

export const createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new Firebase.notifications.Android.Channel(
      'FlightReminder',
      'Reminders Channel',
      Firebase.notifications.Android.Importance.High
    ).setDescription('Used for getting reminder flight');

    // Create the android notification channel
    Firebase.notifications().android.createChannel(channel);
}

export const notificationListener = async () => {
  let channel = null;
  const enabledNotification = Firebase.messaging().hasPermission()
  if (enabledNotification) {
    Firebase.notifications().onNotification(async notification => {
        await Firebase.notifications().displayNotification(notification);
    })
  } else {  
    try {
        await Firebase.messaging().requestPermission();
    } catch (error) {
        Alert.alert(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
        );
    }
  }
  const fcmToken = await Firebase.messaging().getToken();
  if (fcmToken) {
    global.__PUSH_TOKEN__ = fcmToken;
  }
  if (isAndroid) {
    createNotificationChannel()
  }

  Firebase.messaging().onTokenRefresh(newFcmToken => {
    global.__PUSH_TOKEN__ = newFcmToken
  })
}

export const setBadge = nextValue => Firebase.notifications().setBadge(nextValue)

export const bgNotificationListener = async notif => {
  const number = await Firebase.notifications().getBadge()
  const numberValid = _.isNumber(number) && !_.isNaN(number) ? number : 0
  const nextValue = numberValid + 1
  setBadge(nextValue)
  return Promise.resolve(notif)
}
