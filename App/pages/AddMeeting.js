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
import FooterButton from '../components/FooterButtonMeeting';
import SelectInput from '../components/SelectInput';
import OptionModal from '../components/OptionModal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

class AddMeeting extends React.Component {
    constructor(props) {
        super(props)
        const now = new Date();
        this.state = {
            studentId: '',
            teacherId: 'Jon@gmail.com',
            appointmentOn: new Date('2018-03-25'),
            startTime: new Date('2018-03-25 08:00:00'),
            endTime: new Date('2018-03-25 08:30:00'),
        };
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.studentId = props.navigation.state.params.studentId;
            console.log("AddMeeting studentId:", this.state.studentId);
        }       
    }

    handleScheduling = async () => {
        console.log("email: ", this.state.studentId);

        console.log("apiClient : " , apiClient);
        const meeting = Object.assign({}, this.state)

        console.log("Meeting : " , meeting)
        const response = await apiClient('meeting', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting),
        })

        if (!response.ok) {
            // Display error message
            console.log("Response : " , response)
            console.log("Scheduling error")
            return
        }
        console.log("Scheduling done")

        const { navigate } = this.props.navigation
        navigate('Home', { email: meeting.studentId })
    }

    render() {
        console.log(this.state)
        const { goBack } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
            <Header
                title='Schedule meeting'
                mode='normal'
                onPress={() => this.props.navigation.goBack(null)}
                style={{marginBottom :  50}}/>
                <KeyboardAwareView>
                    <TextInputComp
                        placeholder='Buddy'
                        type='email-address'
                        icon='ios-person-outline'
                        onChangeText={(text) => this.setState({ teacherId : text})}
                        value={this.state.teacherId}/>

                    <TextInputComp
                        placeholder='Date'
                        type='default'
                        icon='ios-calendar'
                        onChangeText={(text) => this.setState({ appointmentOn : text})}
                        value={moment(this.state.appointmentOn).format('YYYY-MM-DD')}/>

                    <TextInputComp
                        placeholder='Start time'
                        type='default'
                        icon='ios-time'
                        onChangeText={(text) => this.setState({ startTime : text})}
                        value={moment(this.state.startTime).format('hh-mm-ss')}/>   

                    <TextInputComp
                        placeholder='End time'
                        type='default'
                        icon='ios-time'
                        onChangeText={(text) => this.setState({ endTime : text})}
                        value={moment(this.state.endTime).format('hh-mm-ss')}/>         
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

AddMeeting.navigationOptions = {
    gesturesEnabled: false,
}

export default AddMeeting;