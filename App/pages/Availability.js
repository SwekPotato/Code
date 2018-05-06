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

class Availability extends Component {
    constructor(props) {
        super(props);
        const now = new Date();
        //console.log("currnent date:" , now);
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
        console.log("** Availability: teacherId: " + this.state.teacherId, 
        ", studentId: " + this.state.studentId + ", isSenior:" + this.state.isSenior + ", email:" + 
        this.state.email);   
        
        this.loadAvailability()
    }

    render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    title='My Availability'
                    mode='normal'
                    icon='ios-add'
                    onPress={() => this.addEvent()}/>
                <Agenda
                    items={this.state.items}
                    //loadItemsForMonth={this.loadAvailability}          
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
        navigate('AddAvailability', { 
            id: this.state.id, email: this.state.email, isSenior: this.state.isSenior,
            teacherId: this.state.teacherId, studentId : this.state.studentId});    
    }

    pressCall = () => {
        console.log('Press call button');
        this.setState({ call : false, chiseItem : null });
    }

    getItems = (oldItems, year, month) => {
        const items = Object.assign({}, oldItems);

        for(let day = 1; day <= 31; day++) {
            const dateString = `${year}-${leftPad(month, 2, 0)}-${leftPad(day, 2, 0)}`;
            if (!items[dateString]) {
                items[dateString] = [];
            }
        }
        return items;
    }
  
    loadAvailability = async () => {
        console.log("load availability")

        const table_name = isSenior ? 'TeacherAvailability' : 'StudentAvailability'
        const response = await apiClient(`${table_name}/mine`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log("respons: ", response)
        if (!response.ok || response.status == 204) {
            this.setState({
                items : this.getItems(items, this.state.date.getFullYear(),
                                      this.state.date.getMonth() + 1)
            });
            // Display error message
            console.log("No availability.")
            return
        } 
                
        const availability = await response.json()
        const items = Object.assign({}, this.state.items)

        for(let i = 0; i < availability.length; i++) {
            console.log('availability : ' , availability[i])
            const { date, startTime, endTime, teacherId, studentId, id, active } = availability[i]
            if (!active) continue
            
            console.log("id: ", this.state.id)
            console.log("isSenior: ", this.state.isSenior)
            console.log("studentId: ", studentId)
            console.log("teacherId: ", teacherId)
            console.log("email: ", this.state.email)
            // Get my availability.
            if (this.state.isSenior && teacherId != this.state.email) continue;
            if (!this.state.isSenior && studentId != this.state.email) continue;
            
            console.log("Get availability");
            // const start = new Date(startTime)
            // const end = new Date(endTime)
            // const startString = `${start.getHours()}:${start.getMinutes()}`
            // const endString = `${end.getHours()}:${end.getMinutes()}`
            const startString = moment(startTime).format('h:mm a')
            const endString = moment(endTime).format('h:mm a')
            const existingAvailability = items[date] || []
            const time = startString + '  -  ' + endString
           
            const newAvailability = {
                id: id,
                time: time,
                name: '',
                action: 'Available',
                }
            //console.log("newAvailability:", newAvailability)
            //console.log(...existingAvailability)
            items[date] = [...existingAvailability, newAvailability]  
        }
        //console.log("Items : " , items)
        //console.log('availability : ' , availability)
        this.setState({
            items : this.getItems(items, this.state.date.getFullYear(),
                                  this.state.date.getMonth() + 1)
        });
        console.log("Get Items : " , this.state.items)
    }

    pressItem = (info) => {
        console.log(info);
        this.setState({ call : true, chiseItem : info })
    }

    renderItem = (info) => {
       return <ListItem  info={info} onDelete={() => this.confirm(info)} />       
    }

    confirm = (info) => {
        Alert.alert(
          '',
          'Do you want to delete this availability?',
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
        console.log("Delete availability : " , info)
        let availabilityId = info.id
        console.log("availabilityID : " , availabilityId)   
        const table_name = isSenior ? 'TeacherAvailability' : 'StudentAvailability'     
        const response = await apiClient(`${table_name}/${availabilityId}`, {
            method: "DELETE",
        })
        if (!response.ok || response.status === 204) {
            // Display error message
            console.log("Response : " , response)
            console.log("DeleteAvailability error")
            return
        } 
        // Reset the state and reload data.
        this.setState({items : {}})
        this.loadAvailability()    
        console.log("Availability deleted")
    }

    renderEmptyDate = () => {
        return null
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
}

Availability.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-clock-outline" size={30} color={tintColor} />
    ),
    tabBarLabel : 'Availability',
}
const styles = StyleSheet.create({

});

export default Availability;