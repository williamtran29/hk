/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import { bgNotificationListener } from './Firebase'
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgNotificationListener)
