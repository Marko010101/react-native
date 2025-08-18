// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { useEffect, useRef, useState } from "react";
// import { Platform } from "react-native";
// export interface PushNotificationState {
//   notification?: Notifications.Notification;
//   expoPushToken?: Notifications.ExpoPushToken;
// }

// // Set once at module scope (avoids re-registering on each render)
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     // iOS-specific fields required by NotificationBehavior in newer SDKs
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export const usePushNotifications = (): PushNotificationState => {
//   const [expoPushToken, setExpoPushToken] = useState<
//     Notifications.ExpoPushToken | undefined
//   >();

//   const [notification, setNotification] = useState<
//     Notifications.Notification | undefined
//   >();

//   const notificationListener = useRef<Notifications.EventSubscription | null>(
//     null
//   );
//   const responseListener = useRef<Notifications.EventSubscription | null>(null);

//   async function registerForPushNotificationsAsync() {
//     let token;
//     if (Device.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();

//       let finalStatus = existingStatus;

//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = await Notifications.getExpoPushTokenAsync({
//         projectId: Constants.expoConfig?.extra?.eas?.projectId,
//       });
//       if (Platform.OS === "android") {
//         Notifications.setNotificationChannelAsync("default", {
//           name: "default",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: "#FF231F7C",
//         });
//       }

//       return token;
//     } else {
//     }
//   }

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => {
//       if (token) {
//         setExpoPushToken(token);
//       }
//     });

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         setNotification(response.notification);
//       });

//     return () => {
//       mounted = false;
//       // ✅ New, non-deprecated cleanup
//       notificationListener.current?.remove();
//       responseListener.current?.remove();
//       notificationListener.current = null;
//       responseListener.current = null;
//     };
//   }, []);

//   // you'll add effects/logic later; for now just return state
//   return { notification, expoPushToken };
// };

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

// Set once at module scope
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    // iOS-specific (newer SDKs)
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const usePushNotifications = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >(undefined);
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      // Simulators won't get a push token
      return undefined;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notifications");
      return undefined;
    }

    // Use your EAS projectId for Expo push tokens
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    const token = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }
    let mounted = true;

    registerForPushNotificationsAsync().then((token) => {
      if (mounted && token) setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => {
        setNotification(n);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        setNotification(response.notification);
      });

    return () => {
      mounted = false;
      // ✅ New, non-deprecated cleanup
      notificationListener.current?.remove();
      responseListener.current?.remove();
      notificationListener.current = null;
      responseListener.current = null;
    };
  }, []);

  return { notification, expoPushToken };
};
