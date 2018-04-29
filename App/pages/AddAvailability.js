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
import Label from '../components/Label';
import { color, fonts } from '../setting';

class AddAvailability extends React.Component {
    constructor(props) {
        super(props)
        const now = new Date();
        this.state = {
            email: '',
            isSenior: false,
            studentId: '',
            teacherId: '',
            date: now,
            startTime: now,
            endTime: new Date(now.getTime() + 30 * 60 * 1000),
            active: true,
        };
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.teacherId = props.navigation.state.params.teacherId;
            this.state.studentId = props.navigation.state.params.studentId;
        }
        console.log("** Add Avail: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId + ", isSenior:" + this.state.isSenior + ", email:" + 
        this.state.email);          
    }

    handleScheduling = async () => {
        const availability = Object.assign({}, this.state)

        console.log("Avaliability : " , availability)
        const table_name = isSenior ? 'TeacherAvailability' : 'StudentAvailability'
        const response = await apiClient(table_name, {
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
                style={{marginBottom :  150}}/>
                <KeyboardAwareView style={styles.picker}>
                    <DatePicker
                        style={styles.pickInput}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        placeholder='Date'
                        mode='date'
                        customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                borderWidth: 0,
                                height: 40,
                                borderBottomWidth: 1,
                            }
                            // ... You can check the source to find the other keys.
                          }}
                        onDateChange={(date) => this.setState({ date : date})}
                        date={moment(this.state.date).format('YYYY-MM-DD')}/>

                    <DatePicker
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format="h:mm a"
                        placeholder='Start time'
                        mode='time'
                        onDateChange={(_, date) => this.setState({ startTime : date})}
                        date={(this.state.startTime)}/>      

                    <DatePicker
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        format="h:mm a"
                        placeholder='End time'
                        mode='time'
                        onDateChange={(_, date) => this.setState({ endTime : date})}
                        date={(this.state.endTime)}/>          
                </KeyboardAwareView>

                <FooterButton disable={false} onPress={this.handleScheduling}/>
               
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : 'white',
        justifyContent: 'center',
    },
    picker : {
        marginTop : 100,
        //marginBottom : 50,
        //paddingLeft: 30,
    },
    pickInput : {
        flex : 1,
        lineHeight : 30,
        fontFamily: fonts.regular,
        fontSize: 19,
        color: "black", //"#9b9b9b",
        marginLeft : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

AddAvailability.navigationOptions = {
    gesturesEnabled: false,
}

export default AddAvailability;