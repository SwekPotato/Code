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

class SettingPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            newPassword: '',
            hidePassword: false,
        };
        this.modalDivision = null;
    }

    validatePassword = (text) => {
        const password = this.state.newPassword
        if(password !== text) {
            return "Not the same password"
        }
    }

    makeHandler = (name) => (text) => {
        this.setState({ [name]: text })
    }

    handleChangePassword = async () => {
        const user = Object.assign({}, this.state)
        user.password = base64.encode(user.password)

        const response = await apiClient('user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            // Display error message
            console.log("sign up error")
            return
        }
        console.log("change password done")

        const { navigate } = this.props.navigation
        navigate('Settings', { email: user.email })
    }

    render() {
        console.log(this.state)
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
                        //containerStyle={styles.checkbox}
                        onPress={() => {
                            this.setState({ hidePassword : !this.state.hidePassword })
                        }}      
                        />
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