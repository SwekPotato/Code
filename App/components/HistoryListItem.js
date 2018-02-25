import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProfilePicture from './ProfilePicture';

const HistoryListItem = (props) => (
    <TouchableOpacity 
        style={styles.container}
        onPress = { () => {
            props.navigate('Transcript', {historyId: props.item.id})
        }}
    >
        <View style={styles.infoContainer}>
            <ProfilePicture image={props.item.teacher}/>
            <View style={styles.textContainer}>
                <Text style={styles.topicText}> 
                    {props.item.topic}
                </Text>
                <Text> 
                    {props.item.date}
                </Text>
            </View>
        </View>
        <Icon name="caret-right" size={30} color="lightgray"/>
    </TouchableOpacity>
)

const styles = StyleSheet.create ({
    topicText: {
        fontSize: 26,
    },
    container: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0,
    },
    infoContainer: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    textContainer: {
        marginLeft: 15,
    }
})

export default HistoryListItem