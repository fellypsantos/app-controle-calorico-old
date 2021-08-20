/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

// SETUP PUSH NOTIFICATIONS
PushNotification.configure({
  // smallIcon: 'ic_notification',
  onRegister: token => {
    console.log('Firebase Token is', token);
  },
  onNotification: notification => {
    console.warn('Notification received!', notification);
    // setNotification(pNotification);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },
  onRegistrationError: err => {
    console.error(err.message, err);
  },
});

AppRegistry.registerComponent(appName, () => App);
