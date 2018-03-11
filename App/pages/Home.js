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
//import * as AddCalendarEvent from 'react-native-add-calendar-event';

const { width, height } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        const now = new Date();
        this.state = {
            items : {
                '2018-02-16' : [
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    }
                ],
                '2018-02-17' : [
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    }
                ],
                '2018-02-18' : [
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                ],
                '2018-02-19' : [],
                '2018-02-20' : [
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    },
                    {
                        name : 'Richard Chandler',
                        time : '12:00PM - 12:45PM',
                        topic : 'Acupuncture\nWith Staff Member #1'
                    }
                ],
            },
            call : false,
            chiseItem : null,
        };

        this.state.items = this.getItems(this.state.items, now.getFullYear(), now.getMonth() + 1)
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
        navigate('AddMeeting');
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
    
    loadItems = (month) => {
        this.setState({
            items : this.getItems(this.state.items, month.year, month.month)
        });
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