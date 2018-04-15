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
import SmallButton from '../components/SmallButton';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username : '',
            age : '',
            timezone : '',
           // security : '',
           // answer : '',
            modal : false
        }

        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.email = props.navigation.state.params.email;
        }
        this.loadItems()

        this.modalDivision = null;
    }

    loadItems = async () => {
        console.log("setting for ", this.state.email)
        let userId = this.state.email
        const response = await apiClient(`user/${userId}`, {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
        })  
        // console.log("Response : ", response)
        if(!response.ok || response.status === 204) {
            console.log("Error to get user info : " , response)
            return
        } 
        const user = await response.json()
        //console.log("user : ", user)
        this.setState(
            { email : user.email ,
             password : user.password,
             username : user.name,
             ageGroup: user.ageGroup,
             //security : user.securityQuestion,
             timezone : user.timezone,
             //answer : user.securityAnswer,
             skypeId : user.skypeId,
            })
    }

    handleUpdate = async () => {
        console.log("handleUpdate");
        const user = Object.assign({}, this.state)
        console.log("user:", user)
        // TODO: need to check whether to encode password or not.
        //user.password = base64.encode(user.password)
        let userId = this.state.email
        console.log("userId:", userId)
      
        const response = await apiClient(`user/${userId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            // Display error message
            console.log("Account setting update error")
            return
        }
        console.log("Account setting update done")

        const { navigate } = this.props.navigation
        navigate('LogIn', { email: user.email })
    }

    handleCancel = () => {
        console.log("handleUpdate");
 
        // How to keep the original data.
        const { navigate } = this.props.navigation
        navigate('LogIn', { email: user.email })
    }

    modalClose = (item) => {
        if(item != 'none'){
            if(this.modalDivision == 'security'){
                this.setState({ security : item });
            }else if( this.modalDivision == 'ageGroup' ){
                this.setState({ ageGroup : item });
            }else if( this.modalDivision == 'timezone'){
                this.setState({ timezone : item });
            }
        }

        this.setState({ modal : false });
    }

    modalOpen = (division) => {
        this.modalDivision = division;
        this.setState({
            modal : true
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    title='account setting'
                    mode='normal'
                    //icon='ios-checkmark-outline'
                    onPress={() => this.props.navigation.navigate('Home')}/>

                <KeyboardAwareView>
                    <TextInputComp
                        defaulttext='Email:'
                        placeholder='hello@mail.com'
                        type='email-address'
                        //icon='ios-mail-outline'
                        onChangeText={(text) => this.setState({ email : text})}
                        value={this.state.email}/>

                    <TextInputComp
                        defaulttext='Name:'
                        placeholder='Name'
                        type='default'
                        //icon='ios-person-outline'
                        onChangeText={(text) => this.setState({ username : text})}
                        value={this.state.username}/>

                    <TextInputComp
                        defaulttext='Password:'
                        placeholder='password'
                        type='email-address'
                        // icon='ios-lock-outline'
                        onChangeText={(text) => this.setState({ password : text})}
                        value={this.state.password}
                        isSecure={true}/>

                    <SelectInput
                        defaulttext='Age group:'
                        //icon='ios-person-add-outline'
                        placeholder='ageGroup'
                        onPress={() => this.modalOpen('ageGroup')}
                        value={this.state.ageGroup}/>

                    <SelectInput
                        defaulttext='Timezone:'
                        //icon='ios-pin-outline'
                        placeholder='Time zone'
                        onPress={() => this.modalOpen('timezone')}
                        value={this.state.timezone}/>
{/*}
                    <SelectInput
                        icon='ios-help-circle-outline'
                        placeholder='Security question'
                        onPress={() => this.modalOpen('security')}
                        value={this.state.security}/>

                    <TextInputComp
                        placeholder='Question Answer'
                        type='default'
                        icon='ios-information-circle-outline'
                        onChangeText={(text) => this.setState({ answer : text})}
                        value={this.state.answer}/>
        */}                  
                    <TextInputComp
                        placeholder='Skype ID'
                        type='default'
                        defaulttext='Skype ID:'
                        //icon='ios-information-circle-outline'
                        onChangeText={(text) => this.setState({ skypeId : text})}
                        value={this.state.skypeId}/>     
                </KeyboardAwareView>

                <View> 
                    <SmallButton title='Update' onPress={this.handleUpdate} style={{marginBottom : 20}}/>
                </View>

                <OptionModal
                    visible={this.state.modal}
                    division={this.modalDivision}
                    onClose={this.modalClose}/>
            </SafeAreaView>
        )
    }
} 

Settings.navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-settings-outline" size={30} color={tintColor} />
        ),
        tabBarLabel : 'Account setting',
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor : 'white'
      },
      buttonContainer: {
          flex: 1,
      }
})

export default Settings;