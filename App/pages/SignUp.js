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
import FooterButton from '../components/FooterButton';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';

async function valideUsername(username) {
    const url = `auth/validate?username=${username}`
    const response = await apiClient(url, {
        method: "GET",  
    })
    if(!response.ok) {
        return 'Username already taken'
    } 
    return null
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(email.toLowerCase())

    if(email === '') { 
        return null 
    }
    if(!valid) {
        return "Not a valid email"
    }

    return null
}

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            type: '',
            password: '',
            confirmPassword: '',
            timezone: '',
            answer : null,
            modal : false,
            age : null,
            security : null,
            timezone : null,

        };
        this.modalDivision = null;
    }

    validatePassword = (text) => {
        const password = this.state.password
        if(password !== text) {
            return "Not the same password"
        }
    }

    makeHandler = (name) => (text) => {
        this.setState({ [name]: text })
    }

    handleSignUp = async () => {
        const user = Object.assign({}, this.state)
        if (user.password !== user.confirmPassword) {
            // Display error
            return
        }
        user.password = base64.encode(user.password)
        delete user.confirmPassword
        user.type = user.type.toLowerCase()

        const response = await apiClient('user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            // Display error message
            return
        }

        const { navigate } = this.props.navigation
        navigate('LogIn', { email: user.email })
    }

    modalClose = (item) => {
        if(item != 'none'){
            if(this.modalDivision == 'security'){
                this.setState({ security : item });
            }else if( this.modalDivision == 'age' ){
                this.setState({ age : item });
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
        console.log(this.state)
        const { goBack } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
            <Header
                title='new user'
                mode='normal'
                onPress={() => this.props.navigation.goBack(null)}
                style={{marginBottom :  50}}/>
            {/* <KeyboardAwareView>
                <TextInput
                    label="Username"
                    size={20}
                    value={this.state.username}
                    onChange={this.makeHandler('username')}
                    validate={valideUsername}
                />
                <TextInput
                    label="Email"
                    size={20}
                    value={this.state.email}
                    onChange={this.makeHandler('email')}
                    validate={validateEmail}
                />
                <DropdownInput
                    label="You Are a"
                    options={["Teacher", "Student"]}
                    value={this.state.type}
                    onChange={this.makeHandler('type')}
                />
                <DropdownInput
                    label="Timezone"
                    options={["GMT-8", "GMT+9"]}
                    value={this.state.timezone}
                    onChange={this.makeHandler('timezone')}
                />
                <TextInput
                    label="Password"
                    size={20}
                    value={this.state.password}
                    onChange={this.makeHandler('password')}
                />
                <TextInput
                    label="Confirm Password"
                    size={20}
                    value={this.state.confirmPassword}
                    onChange={this.makeHandler('confirmPassword')}
                    validate={this.validatePassword}
                />
                <View style={styles.buttonContainer}>
                    <Button text="Cancel" size={26} onPress={() => goBack()} />
                    <Button text="Sign Up" size={26} onPress={this.handleSignUp} />
                </View>
            </KeyboardAwareView> */}
                <KeyboardAwareView>
                    <TextInputComp
                        placeholder='hello@mail.com'
                        type='email-address'
                        icon='ios-mail-outline'
                        onChangeText={(text) => this.setState({ email : text})}
                        value={this.state.email}/>

                    <TextInputComp
                        placeholder='password'
                        type='email-address'
                        icon='ios-lock-outline'
                        onChangeText={(text) => this.setState({ password : text})}
                        value={this.state.password}
                        isSecure={true}/>

                    <TextInputComp
                        placeholder='Name'
                        type='default'
                        icon='ios-person-outline'
                        onChangeText={(text) => this.setState({ username : text})}
                        value={this.state.username}/>

                    <SelectInput
                        icon='ios-person-add-outline'
                        placeholder='Age group'
                        onPress={() => this.modalOpen('age')}
                        value={this.state.age}/>

                    <SelectInput
                        icon='ios-pin-outline'
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
                </KeyboardAwareView>

                {/* If all the fields are entered, change disable to false로 so the button is enabled. */}
                {/*<FooterButton disable={true} onPress={() => console.log('sign up press')}/> */}
                <FooterButton disable={false} onPress={() => console.log('sign up press')}/>
                <OptionModal
                    visible={this.state.modal}
                    division={this.modalDivision}
                    onClose={this.modalClose}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : 'white',
    },
})

SignUp.navigationOptions = {
    gesturesEnabled: false,
}

export default SignUp;