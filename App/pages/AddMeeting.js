import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import KeyboardAwareView from '../components/KeyboardAwareView';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ScheduleItem from '../components/ScheduleItem';
import CallButton from '../components/CallButton';
import leftPad from 'left-pad';
import moment from 'moment';
import { apiClient } from '../services/api';

const { width, height } = Dimensions.get('window');

class AddMetting extends Component {
    constructor(props) {
        super(props);
        const now = new Date();
        
        this.state = {
            id: '',
            email: '',
            isSenior: false,
            studentId: '',
            teacherId: '',
            items : {},
            call : false,
            chiseItem : null,
            date: new Date(),
        };

        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.id = props.navigation.state.params.id;
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.studentId = props.navigation.state.params.studentId;
            this.state.teacherId = props.navigation.state.params.teacherId;
        }    
        console.log("** AddMeeting: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId);  

        this.loadSchedule()
    }

    render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    title='Add Meetings'
                    mode='normal'
                    //icon='ios-checkmark-outline'
                    onPress={() => this.props.navigation.navigate('Home')}/>
                <Agenda
                    items={this.state.items}
                    //loadItemsForMonth={this.loadItems}          
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}
                    selected={moment(this.now).format('YYYY-MM-DD')}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                />
            </SafeAreaView>
        );
      }

    addEvent = () => {
        const {navigate} = this.props.navigation;
        navigate('Home', { studentId: this.state.studentId, teacherId: this.state.teacherId });    
    }

    getItems = (oldItems, year, month) => {
        const items = Object.assign({}, oldItems);
        for(let day = 0; day < 31; day++) {
            const dateString = `${year}-${leftPad(month, 2, 0)}-${leftPad(day, 2, 0)}`;
            if (!items[dateString]) {
                items[dateString] = [];
            }
        }
        //console.log("getItem", items);
        return items;
    }
  
    loadSchedule = async () => {
        console.log("load schedule")

        // Seniors look at student availability to schedule a meeting.
        // Students look at senior availability to schedule a meeting.
        const table_name = isSenior ?  'StudentAvailability' : 'TeacherAvailability' 
        console.log("table:", table_name)
        const response = await apiClient(table_name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log("get schedule response:", response)

        if (!response.ok || response.status == 204) {
            this.setState({
                items : this.getItems(items, this.state.date.getFullYear(),
                                      this.state.date.getMonth() + 1)
            });
            // Display error message
            console.log("No schedule.")
            return
        } 
        console.log("recieve schedule")
        const availability = await response.json()
        const items = Object.assign({}, this.state.items)

        for(let i = 0; i < availability.length; i++) {
            console.log('availability : ' , availability[i])
            const { id, active, date, startTime, endTime, studentId, teacherId } = availability[i]

            console.log("stduentId:", typeof(studentId))
            console.log("teacherId:", typeof(teacherId))
            console.log("date:", date)
            console.log("startTime:", startTime)
            console.log("endTime:", endTime)

            if (!active) continue;
            
            // If the user is senior, need student availability.
            // If the user is not senior, need teacher availability.
            if (isSenior) {
                if (typeof(studentId) == 'undefined') continue;
            } else {
                if (typeof(teacherId) == 'undefined') continue;
            }

            const buddyId = isSenior ? studentId : teacherId;
            console.log("buddyId:", buddyId)

            // console.log("Type of TeacherId : ", typeof(teacherId))
            const buddyResponse = await apiClient(`user/${buddyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(!buddyResponse.ok || buddyResponse.status === 204) {
                console.log("Error to get user info : " , buddyResponse)
                return
            } 
            //console.log("Teacher-response : " , teacherResponse)
            const buddy = await buddyResponse.json()
            //console.log("Teacher : " , teacher);
            const start = new Date(startTime)
            const end = new Date(endTime)
            const availableDate = new Date(date)
            const startString = `${start.getHours()}:${start.getMinutes()}`
            const endString = `${end.getHours()}:${end.getMinutes()}`
            const existingMeetings = items[date] || []
            const name = `${buddy.name}`
            const time = startString + '-' + endString

            console.log("stduentId:", typeof(studentId) == 'undefined')
            console.log("teacherId:", teacherId)
            const newMeeting = {
                time: time,
                name: name,
                availabilityId: id,
                teacherId: typeof(teacherId) == 'undefined' ? this.state.email : teacherId,
                studentId: typeof(studentId) == 'undefined' ? this.state.email : studentId,
                date: availableDate,
                startTime: start, 
                endTime: end, 
                active: active,
            }
            //console.log("newMeeting")
            //console.log(...existingMeetings)
            items[date] = [...existingMeetings, newMeeting]  
            //console.log("Items")
        }
        this.setState({
            items : this.getItems(items, this.state.date.getFullYear(),
                                  this.state.date.getMonth() + 1)
        });
    }

    pressItem = (info) => {
        console.log(info);
        this.setState({ call : true, chiseItem : info })
    }

    renderItem = (info) => {
        return <ScheduleItem onPress={() => this.confirm(info)} info={info} /> 
    }

    confirm = (info) => {
        Alert.alert(
          '',
          'Do you want to add this meeting?',
          [
            {text: 'OK', onPress: () => this.addMeeting(info)},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
        )
        { cancelable: false }
    }

    addMeeting = async (info) => {
        //const meeting = Object.assign({}, this.state.items)
        console.log("AddMeeting info:", info)
        const meeting = {
            studentId: info.studentId,
            teacherId: info.teacherId,
            date: info.date,
            startTime: info.startTime,
            endTime: info.endTime,
            availabilityId: info.availabilityId,
        }
        console.log("Add Meeting : " , meeting)
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
        console.log("Add meeting done")

        const { navigate } = this.props.navigation
        navigate('Home', { id: this.state.id, email: this.state.email,
            isSenior: this.state.isSenior, studentId: this.state.studentId, 
            teacherId: this.state.teacherId })
    }

    renderEmptyDate = () => {
        return null
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
}


AddMetting.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-calendar-outline" size={30} color={tintColor} />
    ),
    tabBarLabel : 'Add Meeting',
}

const styles = StyleSheet.create({

});

export default AddMetting;