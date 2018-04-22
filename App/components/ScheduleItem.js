import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'
import { fonts, color } from '../setting';
import Icon from 'react-native-vector-icons/Ionicons';
const ScheduleItem = ({info, onPress, onAdd}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.innterContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.textTime}>{info.time}</Text>
                    <Text style={styles.textName}>{info.name}</Text>
                    {/* <Text style={styles.textTopic}>{info.topic}</Text>                                 */}
                </View>
                <View style={styles.cirle}>
                    <Text style={styles.cirleText}>Add</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

ScheduleItem.defaultProps = {
    onAdd : () => console.log('onAdd'), 
}

ScheduleItem.propTypes = {
    onAdd : PropTypes.func,
    info : PropTypes.object,
    onPress : PropTypes.func
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        flex: 1,
        marginTop : 10,
        marginBottom : 10,
        marginRight : 20,
        paddingTop : 15,
        paddingRight : 10,
        paddingLeft : 15,
        paddingBottom : 10,
    },
    innterContainer : {
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
    infoContainer : {
        marginRight : 40
    },
    cirle : {
        width: 80,
        height: 40,
        backgroundColor : color.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cirleText : {
        fontFamily: fonts.regular,
        fontSize: 18,
        textAlign: "center",
        color: "#ffffff"
    },
    textTime : {
        fontFamily: fonts.regular,
        fontSize: 14,
        lineHeight : 20,
    },
    textName : {
        fontFamily: fonts.regular,
        fontSize: 18,
        lineHeight : 25,
    },
    textTopic : {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: "#9b9b9b",
        lineHeight : 20,
    },
    icon : {
        alignItems: 'flex-end',
    }
});

export default ScheduleItem;