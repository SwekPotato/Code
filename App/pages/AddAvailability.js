import React from 'react';
import { StyleSheet, Text, View, Picker, DatePickerIOS } from 'react-native'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import base64 from 'base-64'
import KeyboardAwareView from '../components/KeyboardAwareView';
import DropdownInput from '../components/DropdownInput';
import { apiClient } from '../services/api';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import TextInputComp from '../components/TextInputComp';
import FooterButton from '../components/FooterButtonMeeting';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

class AddAvailability extends React.Component {
    constructor(props) {
        super(props)
        const now = new Date();
        this.state = {
            email: '',
            isSenior: false,
            teacherId: '',
            studentId: '',
            date: now,
            startTime: now,
            endTime: new Date(now.getTime() + 30 * 60 * 1000),
        };
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.teacherId = props.navigation.state.params.teacherId;
            this.state.studentId = props.navigation.state.params.studentId;
        }
        console.log("Add Ava: teacehrId: " + this.state.teacherId, ", stid: ", this.state.studentId);        
    }

    handleScheduling = async () => {
        const availability = Object.assign({}, this.state)

        console.log("Avaliability : " , availability)
        const response = await apiClient('availability', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(availability),
        })

        if (!response.ok) {
            // Display error message
            console.log("Response : " , response)
            console.log("AddAvaliability error")
            return
        }
        console.log("AddAvaliability done")

        const { navigate } = this.props.navigation
        navigate('Availability', { email: this.state.email, isSenior: this.state.isSenior,
                            teacherId: this.state.teacherId, studentId: this.state.studentId})
    }

    render() {
        console.log(this.state)
        const { goBack } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
            <Header
                title='Add Availability'
                mode='normal'
                onPress={() => this.props.navigation.goBack(null)}
                style={{marginBottom :  50}}/>
                <KeyboardAwareView>
                    <DatePicker
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        placeholder='Date'
                        mode='date'
                        onDateChange={(date) => this.setState({ date : date})}
                        date={moment(this.state.date).format('YYYY-MM-DD')}/>

                    <DatePicker
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format="h:mm a"
                        placeholder='Start time'
                        mode='time'
                        onDateChange={(date) => this.setState({ startTime : date})}
                        date={moment(this.state.startTime).format('h:mm a')}/>   

                    <DatePicker
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format="h:mm a"
                        placeholder='End time'
                        mode='time'
                        onDateChange={(date) => this.setState({ endTime : date})}
                        date={this.state.endTime}/>         
                </KeyboardAwareView>

                {/* If all the fields are entered, change disable to false로 so the button is enabled. */}
                {/*<FooterButton disable={true} onPress={() => console.log('sign up press')}/> */}
                <FooterButton disable={false} onPress={this.handleScheduling}/>
               
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

AddAvailability.navigationOptions = {
    gesturesEnabled: false,
}

export default AddAvailability;