import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import base64 from 'base-64'
import KeyboardAwareView from '../components/KeyboardAwareView';
import DropdownInput from '../components/DropdownInput';
import { apiClient } from '../services/api';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import TextInputComp from '../components/TextInputComp';
import FooterButton from '../components/FooterButtonUpdate';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';
import {CheckBox} from 'react-native-elements';
import ErrorMessage from '../components/ErrorMessage';

class SettingPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            name: '',
            isSenior: false,
            studentId: '',
            teacherId: '',
            password: '',
            newPassword: '',
            hidePassword: false,
            invalidPassword: false
        };
        this.modalDivision = null;

        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.id = props.navigation.state.params.id;
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.studentId = props.navigation.state.params.studentId;
            this.state.teacherId = props.navigation.state.params.teacherId;
        } 
        console.log("** Password: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId + ", isSenior:" + this.state.isSenior + ", email:" + 
        this.state.email, ", id:", this.state.id);        
    }

    validatePassword = (text) => {
        const password = this.state.newPassword
        if(password !== text) {
            return "New password should not be same"
        }
    }

    makeHandler = (name) => (text) => {
        this.setState({ [name]: text })
    }

    handleChangePassword = async () => {
        this.state.invalidPassword = false
        if (!this.state.password  || !this.state.newPassword ||
            this.state.password  == this.state.newPassword) {
            this.setState({ invalidPassword : true })
            return;
        }

        let userId = this.state.id      
        console.log("userId:", userId)
        const user = Object.assign({}, this.state)
        user.password = base64.encode(user.password)
        user.newPassword = base64.encode(user.newPassword)

        //console.log("user:", user)
        const response = await apiClient(`user/${userId}/changePassword`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        //console.log(response)
        if (!response.ok) {
            // Display error message
            console.log("password change error")
            return
        }
        console.log("change password done")

        const { navigate } = this.props.navigation
        navigate('Settings',
            { id: this.state.id, email: this.state.email, isSenior: this.state.isSenior,
              teacherId: this.state.teacherId, studentId: this.state.studentId})
    }

    render() {
        //console.log(this.state)
        const { goBack } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
            <Header
                title='Password'
                mode='normal'
                onPress={() => this.props.navigation.goBack(null)}
                style={{marginBottom :  50}}/>
                <KeyboardAwareView>
                    <TextInputComp
                        placeholder='Password'
                        defaulttext='Password:'
                        onChangeText={(text) => this.setState({ password : text})}
                        value={this.state.password}
                        isSecure={this.state.hidePassword}
                        />
                     <TextInputComp
                        placeholder='Password'
                        defaulttext='New password:'
                        onChangeText={(text) => this.setState({ newPassword : text})}
                        value={this.state.newPassword}
                        isSecure={this.state.hidePassword}
                        />  
                    <View style={{marginBottom :  20}}/>                       
                    <CheckBox right title='Hide password'
                        checked={this.state.hidePassword}
                        containerStyle={styles.checkbox}
                        onPress={() => {
                            this.setState({ hidePassword : !this.state.hidePassword })
                        }}      
                        />
                    {
                    this.state.invalidPassword && 
                    <ErrorMessage/>
                    }
                </KeyboardAwareView>

                <FooterButton disable={false} onPress={this.handleChangePassword}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : 'white',
    },
    checkbox: {
        backgroundColor : 'white',
        //lineHeight : 22,
        //fontSize: 19,
        //color: '#4a90e2',
        //flexDirection: 'row',
        //justifyContent: 'flex-end',
    }
})

SettingPassword.navigationOptions = {
    gesturesEnabled: false,
}

export default SettingPassword;