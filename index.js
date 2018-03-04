import { AppRegistry } from 'react-native';
import App from './App';
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest

if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
}

AppRegistry.registerComponent('TwentySeventy', () => App);
