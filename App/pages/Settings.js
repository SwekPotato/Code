import React, { Component } from 'react';
import Button from '../components/Button';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import TextInputComp from '../components/TextInputComp';
import FooterButton from '../components/FooterButton';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';
import KeyboardAwareView from '../components/KeyboardAwareView';
import { apiClient } from '../services/api';
import LargeButton from '../components/LargeButton';
import Label from '../components/Label';

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'Jon@gmail.com',
            name: 'Jon',
        }
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.email = props.navigation.state.params.email;
            this.state.name = props.navigation.state.params.name;
        }
    }    
    handleAccountChange = () => {
      const { navigate } = this.props.navigation 
      navigate('SettingUserInfo', { email: this.state.email, name: this.state.name })
    }
  
    handlePasswordChange = () => {
      const { navigate } = this.props.navigation 
      navigate('SettingPassword', { email: this.state.email, name: this.state.name })
    }

    handleSignOut = () => {
        console.log("TODO signout")
        const { navigate } = this.props.navigation 
        navigate('Main', { email: ''})
    }
      
    render() {
      return (
        <SafeAreaView style={styles.container}>
            <Header
                title='Settings'
                mode='home'
                onPress={() => this.props.navigation.navigate('Home')}
                style={{marginBottom :  150}}/>

            {/*<Label text='Name:' size={this.props.size} />
            <Label text={this.state.name} size={this.props.size} />   */} 
            <LargeButton title='User Info' onPress={this.handleAccountChange} 
             style={{marginBottom : 30}}/>  
            <LargeButton title='Password' onPress={this.handlePasswordChange}
             style={{marginBottom : 30}}/>    
            <LargeButton title='Sign out' onPress={this.handleSignOut}
             style={{marginBottom : 30}}/>         

        </SafeAreaView>
      )
    }
}

Settings.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings-outline" size={30} color={tintColor} />
    ),
    tabBarLabel : 'Settings',
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor : 'white',
      },
      buttonContainer: {
          flex: 1,
          paddingTop : 200,
      }
})

export default Settings;
