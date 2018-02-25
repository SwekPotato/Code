import { AppRegistry } from 'react-native';
import App from './App';

if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
}

AppRegistry.registerComponent('TwentySeventy', () => App);
