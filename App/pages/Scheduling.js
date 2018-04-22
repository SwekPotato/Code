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

class Scheduling extends Component {
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
            this.state.email = props.navigation.state.params.email;
            this.state.isSenior = props.navigation.state.params.isSenior;
            this.state.studentId = props.navigation.state.params.studentId;
            this.state.teacherId = props.navigation.state.params.teacherId;
        }    
        console.log("** Scheduling: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId);  

        this.loadSchedule()
    }

    render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    title='Add My Meetings'
                    mode='home'
                    //icon='ios-add'
                    //onPress={() => this.addEvent()}
                    />
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
        navigate('AddMeeting', { studentId: this.state.studentId, teacherId: this.state.teacherId });    
    }

    getItems = (oldItems, year, month) => {
        const items = Object.assign({}, oldItems);

        for(let day = 0; day < 31; day++) {
            const dateString = `${year}-${leftPad(month, 2, 0)}-${leftPad(day, 2, 0)}`;
            if (!items[dateString]) {
                items[dateString] = [];
            }
        }
        return items;
    }
  
    loadSchedule = async () => {
        console.log("load schedule")
        const response = await apiClient('availability', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
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
            //console.log('availability : ' , availability[i])
            const { date, startTime, endTime, teacherId, studentId, id } = availability[i]

            if (typeof(studentId) == 'undefined' && typeof(teacherId) == 'undefined') continue;
            if (studentId == "" && teacherId == "") continue;

            // If the user is senior, need student availability.
            // If the user is not senior, need teacher availability.

            if (isSenior) {
                if (studentId == null || studentId == "") continue;
            } else {
                if (teacherId == null || teacherId == "") continue;
            }

            const buddyId = isSenior ? stduentId : teacherId;
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
            const startString = `${start.getHours()}:${start.getMinutes()}`
            const endString = `${end.getHours()}:${end.getMinutes()}`
            const existingMeetings = items[date] || []
            const name = `${buddy.name}`
            const time = startString + '-' + endString

            const newMeeting = {
                startTime: startString, 
                endTime: endString, 
                time: time,
                name: name,
                id: id, 
                buddyId: buddyId}
                //console.log("newMeeting")
                //console.log(...existingMeetings)
            items[date] = [...existingMeetings, newMeeting]  
            //console.log("Items")
        }
        //console.log("Items : " , items)
        //console.log('Meetings : ' , availability)
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
        const meeting = Object.assign({}, this.state.items)
        console.log("info:", info)
        const meeting = 
        {
            studentId: this.state.studentId,
            teacherId: this.state.teacherId,
            date: info.date,
            startTime: info.startTime,
            endTime: info.startTime,
        }

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
        navigate('Home', { email: this.state.email })
    }

    renderEmptyDate = () => {
        return null
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
}

Scheduling.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-calendar-outline" size={30} color={tintColor} />
    ),
    tabBarLabel : 'Scheduling',
}
const styles = StyleSheet.create({

});

export default Scheduling;