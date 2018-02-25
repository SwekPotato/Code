import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import KeyboardAwareView from '../components/KeyboardAwareView';
import Header from '../components/Header';
import TextInputComp from '../components/TextInputComp';
import FooterButton from '../components/FooterButton';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';
class ForgotPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null,
            security : null,
            answer : null,
            modal : false
        };
        this.modalDivision = null;
    }

    modalClose = (item) => {
        if(item != 'none'){
            if(this.modalDivision == 'security'){
                this.setState({ security : item });
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
                    title='forgot password'
                    mode='normal'
                    onPress={() => this.props.navigation.goBack(null)}
                    style={{marginBottom : 130}}/>
                <KeyboardAwareView>
                    <TextInputComp
                        placeholder='hello@mail.com'
                        type='email-address'
                        icon='ios-mail-outline'
                        onChangeText={(text) => this.setState({ email : text})}
                        value={this.state.email}/>
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

                {/* 입력이 완료 되면 disable을 false로 변화하면 활성화 됩니다. */}
                <FooterButton
                    title='Find Password'
                    disable={false} onPress={() => console.log('Find Password')}/>

                <OptionModal
                    visible={this.state.modal}
                    division={this.modalDivision}
                    onClose={this.modalClose}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    }
})

export default ForgotPwd;