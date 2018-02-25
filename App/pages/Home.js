import React, { Component } from 'react'
import HomeTeacher from './HomeTeacher'
import HomeStudent from './HomeStudent'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import TextInput from '../components/TextInput'
import KeyboardAwareView from '../components/KeyboardAwareView';
import { SafeAreaView } from 'react-navigation';
import Header from '../components/Header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ListItme from '../components/ListItem';
import CallButton from '../components/CallButton';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

const { width, height } = Dimensions.get('window');

// const Home = (props) => {
//     if(props.navigation.state.params.type === "teacher") {
//         // Display HomeTeacher
//         return (
//             <View style={styles.titleContainer}>
//                 <KeyboardAwareView>
//                 <View style={styles.container}>
//                     <TextInput
//                         label="Date"
//                         size={20}
//                     />
//                     <TextInput
//                         label="Time"
//                         size={20}
//                     />
//                     <TextInput
//                         label="Tutor"
//                         size={20}
//                     />
//                 </View>
//                 </KeyboardAwareView>
//             </View>
//         )
//     } else {
//         // Display HomeStudent
//         return (
//             <View style={styles.titleContainer}>
//                 <Title text="Scheduling"/>
//             </View>
//         )
//     }
// }

class Home extends Component {
    constructor(props) {
        super(props);
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
      }

      static calendarEvent = (title) => {

        const eventConfig = {
            title : title
          };

          AddCalendarEvent.presentNewCalendarEventDialog( eventConfig )
            .then(eventId => {
              //handle success (receives event id) or dismissing the modal (receives false)
              if (eventId) {
                console.warn(eventId);
              } else {
                console.warn('dismissed');
              }
            })
            .catch((error) => {
              // handle error such as when user rejected permissions
              console.warn(error);
            });
        }
    
      render() {
        return (
            <SafeAreaView style={{width : width, height : height - 50 }}>
                <Header
                    mode="logo"
                    onPress={() => Home.calendarEvent('eventTitle')} />
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

    pressCall = () => {
        console.log('Press call button');
        this.setState({ call : false, chiseItem : null });

    }
    
    loadItems = ({dateString}) => {

    }

    pressItem = (info) => {
        console.log(info);
        this.setState({ call : true, chiseItem : info })
    }

    renderItem = (info) => {
        return <ListItme onPress={() => this.pressItem(info)} info={info}/>
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