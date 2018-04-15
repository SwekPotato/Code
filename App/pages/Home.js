import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import KeyboardAwareView from '../components/KeyboardAwareView';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ListItem from '../components/ListItem';
import CallButton from '../components/CallButton';
import leftPad from 'left-pad';
import moment from 'moment';
import { apiClient } from '../services/api';

const { width, height } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        const now = new Date();
        console.log("currnent date:" , now);
        this.state = {
            email: '',
            items : {},
            call : false,
            chiseItem : null,
            date: new Date(),
        };

        //this.loadItems() //now.getMonth() + 1)
        if (props.navigation && props.navigation.state && props.navigation.state.params) {
            this.state.email = props.navigation.state.params.email;
        }
    }

    render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    mode="logo"
                    onPress={() => this.addEvent()}/>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems}          
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}
                    selected={moment(this.now).format('YYYY-MM-DD')}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                />
                {
                    this.state.call && 
                    <CallButton 
                        onPress={this.pressCall}
                        name={this.state.chiseItem.name}
                        time={this.state.chiseItem.time}/>
                }
            </SafeAreaView>
        );
      }

    addEvent = () => {
        const {navigate} = this.props.navigation;
        navigate('AddMeeting', { studentId: this.state.email });    
    }

    pressCall = () => {
        console.log('Press call button');
        this.setState({ call : false, chiseItem : null });
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
  
    loadItems = async () => {
        console.log("load meetings")
        const response = await apiClient('meeting', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        //console.log("meeting response:", response)
        if (!response.ok || response.status == 204) {
            this.setState({
                items : this.getItems(items, this.state.date.getFullYear(),
                                      this.state.date.getMonth() + 1)
            });
            // Display error message
            console.log("No meetings.")
            return
        } 
        const meetings = await response.json()
        console.log("Meetings : " , meetings)

        const items = Object.assign({}, this.state.items)

        for(let i = 0; i < meetings.length; i++) {
            //console.log('Meetings : ' , meetings[i])
            const { appointmentOn, startTime, endTime, teacherId, id } = meetings[i]
            // console.log("TeacherId : ", teacherId)
            // console.log("Type of TeacherId : ", typeof(teacherId))
            const teacherResponse = await apiClient(`user/${teacherId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(!response.ok || response.status === 204) {
                console.log("Error to get user info : " , response)
                return
            } 
            //console.log("Teacher-response : " , teacherResponse)
            const teacher = await teacherResponse.json()
            //console.log("Teacher : " , teacher);
            const start = new Date(startTime)
            const end = new Date(endTime)
            const startString = `${start.getHours()}:${start.getMinutes()}`
            const endString = `${end.getHours()}:${end.getMinutes()}`
            const existingMeetings = items[appointmentOn] || []
            const name = `${teacher.name}`
            const time = startString + '-' + endString

            const newMeeting = 
                {startTime: startString, 
                endTime: endString, 
                time: time,
                name: name,
                id: id, 
                with: teacher.name}
                //console.log("newMeeting")
                //console.log(...existingMeetings)
            items[appointmentOn] = [...existingMeetings, newMeeting]  
            //console.log("Items")
        }
        console.log("Items : " , items)
        console.log('Meetings : ' , meetings)
        //this.setState({
        //    items : this.getItems(items, month.year, month.month)
        //});
    }

    pressItem = (info) => {
        console.log(info);
        this.setState({ call : true, chiseItem : info })
    }

    renderItem = (info) => {
        return <ListItem onPress={() => this.pressItem(info)} info={info}/>
    }

    renderEmptyDate = () => {
        return null
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
}

Home.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-calendar-outline" size={30} color={tintColor} />
    )
}
const styles = StyleSheet.create({

});

export default Home;