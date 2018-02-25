import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ProfilePicture from './ProfilePicture';

const TopicListItem = (props) => (
    <TouchableOpacity 
        style={styles.container}
        onPress = { () => {
            props.navigate('Transcript', {historyId: props.item.id})
        }}
    >
        <View style={styles.infoContainer}>
            <ProfilePicture image={props.item.picture || 'https://images-na.ssl-images-amazon.com/images/I/91KHKgwDo-L._SL1500_.jpg'}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}> 
                    {props.item.name}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create ({
    text: {
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

export default TopicListItem