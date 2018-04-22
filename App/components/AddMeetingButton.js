import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { color, fonts } from '../setting';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

class AddMeetingButton extends Component {
    state = {
        fadeAnim: new Animated.Value(0),
    }
    
    componentDidMount() {
        Animated.timing(                 
          this.state.fadeAnim,          
          {
            toValue: 1, 
            duration: 10000,              
          }
        ).start();                        
      }
      render() {
       const { onPress, time, name } = this.props;
       return(
        <Animated.View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.innerContainer}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {fontSize : 12, lineHeight : 20}]}>
                        Add meeting?
                    </Text>
                    <Text style={[styles.text, {fontSize : 12, lineHeight : 20}]}>{time}</Text>
                    <Text style={[styles.text, {fontSize : 16, lineHeight : 25}]}>{name}</Text>                
                </View>
                <Icon name='ios-checkmark-circle-outline' size={10} color='white'/>
                <Icon name='ios-close-circle-outline' size={10} color='white'/>
            </TouchableOpacity>
        </Animated.View>
        );
    }
};

AddMeetingButton.defaultProps = {
    time : '12:00PM - 12:45PM',
    name : 'Richard Chandler'
};

const styles = StyleSheet.create({
    container : {
        width : width,
        position : 'absolute',
        ...Platform.select({
            ios : {
                bottom : 20
            },
            android : {
                top : height * 0.75
            }
        }),
        paddingLeft : 20,
        paddingRight : 20,
    },
    innerContainer : {
        flex : 1,
        height : 90,
        backgroundColor : color.secondry,
        borderRadius: 10,
        padding : 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer : {

    },
    text : {
        fontFamily: fonts.regular,
        color: "#ffffff"
    }
});

export default AddMeetingButton;