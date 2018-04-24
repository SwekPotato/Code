import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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
        console.log("** Home: email: ", this.state.email, ", teacherId: " + this.state.teacherId, 
                    ", studentId: " + this.state.studentId);   
                    
        this.loadItems()    
    }

    render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    title='My meetings'
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
        navigate('AddMeeting', { studentId: this.state.studentId,  teacherId: this.state.teacherId });    
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
        // TODO: Get only my meetings.
        // Need to get data using either studentId or teacherId.
        console.log("load meetings")
        const response = await apiClient('meeting', {
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
            console.log("No meetings.")
            return
        } 
        const meetings = await response.json()
        const items = Object.assign({}, this.state.items)

        for(let i = 0; i < meetings.length; i++) {
            //console.log('Meetings : ' , meetings[i])
            const { date, startTime, endTime, teacherId, studentId, id } = meetings[i]
            // console.log("Type of TeacherId : ", typeof(teacherId))
            const buddyId = this.state.isSenior ? studentId : teacherId
            const buddyResponse = await apiClient(`user/${buddyId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(!buddyResponse.ok || buddyResponse.status === 204) {
                console.log("Error to get user info : " , response)
                return
            } 
            //console.log("Teacher-response : " , buddyResponse)
            const buddy = await buddyResponse.json()
            //console.log("Teacher : " , teacher);
            const start = new Date(startTime)
            const end = new Date(endTime)
            const startString = `${start.getHours()}:${start.getMinutes()}`
            const endString = `${end.getHours()}:${end.getMinutes()}`
            const existingMeetings = items[date] || []
            const name = `${buddy.name}`
            const time = '(' + startString + '-' + endString + ')'

            const newMeeting = 
                {startTime: startString, 
                endTime: endString, 
                time: time,
                name: name,
                action: 'Call with',
                id: id, 
                with: buddy.name}
                //console.log("newMeeting")
                //console.log(...existingMeetings)
            items[date] = [...existingMeetings, newMeeting]  
            //console.log("Items")
        }
        //console.log("Items : " , items)
        //console.log('Meetings : ' , meetings)
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
       return <ListItem onPress={() => this.pressItem(info)} info={info} 
               onDelete={() => this.confirm(info)} />       
    }

    confirm = (info) => {
        Alert.alert(
          '',
          'Do you want to delete the meeting?',
          [
            {text: 'OK', onPress: () => this.pressDelete(info)},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ],
        )
        { cancelable: false }
    }

    pressDelete = async(info) => {
        //copy meetings you already have, find meetings you need to delete, then delete from object/array
        //keep referencing this.loaditems
        console.log("Delete Meeting : " , info)
        let meetingId = info.id
        //console.log("MeetingID : " , meetingId)        
        const response = await apiClient(`meeting/${meetingId}`, {
            method: "DELETE",
        })
        if (!response.ok || response.status === 204) {
            // Display error message
            console.log("Response : " , response)
            console.log("DeleteMeeting error")
            return
        } 
 
        this.updateAvailability(info)

        this.setState({items : {}})
        this.loadItems()    
        console.log("Meeting deleted")
    }

    updateAvailability = async(info) => {
        //copy meetings you already have, find meetings you need to delete, then delete from object/array
        //keep referencing this.loaditems
        console.log("Update availability : " , info)
        let availabilityId = info.availabilityId
        console.log("availabilityID : " , availabilityId)  
        const availability = {
            'active': true,
        } 
        const table_name = this.state.isSenior ?  'StudentAvailability' : 'TeacherAvailability' 
        const response = await apiClient(`${table_name}/${availabilityId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(availability)
        })
        if (!response.ok || response.status === 204) {
            // Display error message
            console.log("Response : " , response)
            console.log("updateAvailability error")
            return
        } 
        // Reset the state and reload data.  
        console.log("updateAvailability done")
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
        <Icon name="ios-home-outline" size={30} color={tintColor} />
    ),
    tabBarLabel : 'Home',
}
const styles = StyleSheet.create({

});

export default Home;