import { Platform } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { color, fonts } from './setting';
import MainPage from './pages/Main';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import HistoryPage from './pages/History';
import CallPage from './pages/Call';
import TopicsPage from './pages/Topics';
import TranscriptPage from './pages/Transcript';
import ForgotPwd from './pages/ForgotPwd';
import SettingUserInfoPage from './pages/SettingUserInfo';
import SettingPasswordPage from './pages/SettingPassword';
import AddMeetingPage from './pages/AddMeeting';
import AvailabilityPage from './pages/Availability';
import AddAvailabilityPage from './pages/AddAvailability';

// const App = StackNavigator({
//   Main: { screen: MainPage }, 
//   SignUp: { screen: SignUpPage },
//   LogIn: {screen: LogInPage},
//   Home: { 
//     screen: TabNavigator({
//       Call: {screen: CallPage},
//       Topics: {screen: TopicsPage},
//       Home: {screen: HomePage},
//       History: {screen: HistoryPage},
//       Settings: {screen: SettingsPage},
//     }, {
//       initialRouteName: "Home"
//     }),
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false,
//     }
//   },
//   Transcript: { screen: TranscriptPage },
// })

const HomeTabScreen = TabNavigator({
  Home: {screen: HomePage},
  //Topics: {screen: TopicsPage},
  // Call: {screen: CallPage},
  //History: {screen: HistoryPage},
  //Scheduling: {screen: SchedulingPage},
  Availability: {screen: AvailabilityPage},
  Settings: {screen: SettingsPage}
}, {
  tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor : '#ffffff',
    activeBackgroundColor : color.secondry,
    labelStyle: {
      fontFamily: fonts.regular,
    },
    style: {
      backgroundColor: color.primary,
    },
    backBehavior: 'none',
    initialRouteName : 'Home',
    ...Platform.select({
      android : {
        showIcon : true,
        showLabel : false,
        scrollEnabled : false,
        indicatorStyle : {
          backgroundColor : 'transparent'
        }
      }
    })
  },
  tabBarPosition: 'bottom',
})

const App = StackNavigator({
  Main : {
    screen: MainPage
  },
  LogIn: {
    screen: StackNavigator({
      LogInScreen : { screen : LogInPage },
      ForgotPwdScreen : { screen : ForgotPwd }
    },{
      mode: 'modal',
      headerMode: 'none'
    })
  },
  SignUp: {
    screen: SignUpPage
  },
  Home : {
    screen : HomeTabScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  AddMeeting : {
    screen: AddMeetingPage
  },
  AddAvailability : {
    screen: AddAvailabilityPage
  }, 
  SettingUserInfo : {
    screen: SettingUserInfoPage
  },
  SettingPassword : {
    screen: SettingPasswordPage
  }     
},{
    mode: 'modal',
    headerMode: 'none'
});

export default App