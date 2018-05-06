import React, { Component } from 'react';
import Button from '../components/Button';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import { SafeAreaView } from 'react-navigation';
import TextInputComp from '../components/TextInputComp';
import FooterButton from '../components/FooterButtonUpdate';
import SelectInput from '../components/SelectInput';
import ShowInput from '../components/ShowInput';
import OptionModal from '../components/OptionModal';
import KeyboardAwareView from '../components/KeyboardAwareView';
import { apiClient } from '../services/api';
import SmallButton from '../components/SmallButton';
import Label from '../components/Label';

class SettingUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            username : '',
            isSenior: false,
            studentId: '',
            teacherId: '',
            ageGroup : '',
            timezone : '',
           // security : '',
           // answer : '',
            modal : false
        }

        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.id = props.navigation.state.params.id;
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.studentId = props.navigation.state.params.studentId;
            this.state.teacherId = props.navigation.state.params.teacherId;
        }
        this.loadItems()

        console.log("** Userinfo: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId + ", isSenior:" + this.state.isSenior + ", email:" + 
        this.state.email, ", id:", this.state.id);    

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
            {
             username : user.name,
             ageGroup: user.ageGroup,
             //security : user.securityQuestion,
             //timezone : user.timezone,
             //answer : user.securityAnswer,
             skypeId : user.skypeId,
             id: user.id,
            })
    }

    handleUpdate = async () => {
        console.log("handleUpdate");
        const user = {
            'ageGroup': this.state.ageGroup,
            //'timezone': this.state.timezone,
            'skypeId' : this.state.skypeId,
        }
        //console.log("user:", user)
        // TODO: need to check whether to encode password or not.
        //user.password = base64.encode(user.password)
        let userId = this.state.id  
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
            console.log("User setting update error")
            return
        }
        console.log("User setting update done")

        const { goBack } = this.props.navigation
        goBack(null)
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
                    title='User Info'
                    mode='normal'
                    //icon='ios-checkmark-outline'
                    onPress={() => this.props.navigation.goBack(null)}
                    style={{marginBottom :  15}}/>

                <KeyboardAwareView style={styles.container}>
                    <ShowInput name='Name: ' value={this.state.username}/>     
                    <ShowInput name='Email: ' value={this.state.email} />
                    <SelectInput
                        defaulttext='Age group:'
                        //icon='ios-person-add-outline'
                        placeholder='ageGroup'
                        onPress={() => this.modalOpen('ageGroup')}
                        value={this.state.ageGroup}/>
{/*}
                    <SelectInput
                        defaulttext='Timezone:'
                        //icon='ios-pin-outline'
                        placeholder='Time zone'
                        onPress={() => this.modalOpen('timezone')}
                        value={this.state.timezone}/>

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
                <FooterButton disable={false} onPress={this.handleUpdate}/>

                <OptionModal
                    visible={this.state.modal}
                    division={this.modalDivision}
                    onClose={this.modalClose}/>
            </SafeAreaView>
        )
    }
} 

SettingUserInfo.navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-settings-outline" size={30} color={tintColor} />
        ),
        tabBarLabel : 'Account setting',
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor : 'white',
    },
    buttonContainer: {
        flex: 1,
        paddingTop : 5,
        backgroundColor : 'white',
    }
})

export default SettingUserInfo;