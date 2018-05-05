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
            id: '',
            email: '',
            name: '',
            isSenior: false,
            studentId: '',
            teacherId: '',
        }
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.id = props.navigation.state.params.id;
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.studentId = props.navigation.state.params.studentId;
            this.state.teacherId = props.navigation.state.params.teacherId;
        }
        console.log("** Setting: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId + ", isSenior:" + this.state.isSenior + ", email:" + 
        this.state.email, ", id:", this.state.id);    
    }    
    handleAccountChange = () => {
      const { navigate } = this.props.navigation 
      navigate('SettingUserInfo', 
          { id: this.state.id, email: this.state.email, isSenior: this.state.isSenior,
            teacherId: this.state.teacherId, studentId: this.state.studentId})
    }
  
    handlePasswordChange = () => {
      const { navigate } = this.props.navigation 
      navigate('SettingPassword', 
            { id: this.state.id, email: this.state.email, isSenior: this.state.isSenior,
                teacherId: this.state.teacherId, studentId: this.state.studentId})
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
