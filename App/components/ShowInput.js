import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { color, fonts } from '../setting';

const { width, height } = Dimensions.get('window');

class ShowInput extends Component {
    state={
        isFocus : false,
    }
    render() {
        const {
            name, value
        } = this.props;
        return (
            <TouchableOpacity style={styles.container} activeOpacity={1}>
                <View style={[styles.innerContainer, { 
                    borderBottomColor : this.state.isFocus ? color.primary : '#dcdcdc'
                    }]}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>{value}</Text>
                </View>
            </TouchableOpacity>
            );
        }
};

ShowInput.defaultProps = {
};

const styles = StyleSheet.create({
    container : {
        width : width,
        paddingLeft : 25,
        paddingRight : 25,
        marginTop : 7,
        marginBottom : 7
    },
    innerContainer : {
        height : 48,
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    textInput : {
        flex : 1,
        lineHeight : 22,
        fontFamily: fonts.regular,
        fontSize: 16,
        color: "#000000", //"#9b9b9b",
        marginLeft : 20,
    },
    text : {
        fontSize: 17,
        fontFamily: fonts.regular,
        color: "#9b9b9b",
    }
})

export default ShowInput;

