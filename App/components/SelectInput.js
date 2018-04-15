import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { color, fonts } from '../setting';

const { width, height } = Dimensions.get('window');

class SelectInput extends Component {
    state={
        isFocus : false,
    }
    render() {
        const {
            placeholder, icon, value, onPress, defaulttext
        } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={1}>
                <View style={[styles.innerContainer, { 
                    borderBottomColor : this.state.isFocus ? color.primary : '#dcdcdc'
                    }]}>
                    <Text style={styles.text}>{defaulttext}</Text>
                    <Icon name={icon} size={30} color='#9b9b9b'/>
                    <TextInput
                        value={value}
                        editable={false}
                        underlineColorAndroid ={'transparent'}
                        placeholder={placeholder}
                        onFocus={() => this.setState({ isFocus : true })}
                        style={styles.textInput}
                        onEndEditing={() => this.setState({ isFocus : false })}
                    />
                    <Icon name='md-arrow-dropdown' size={30} onPress={onPress}/>
                </View>
            </TouchableOpacity>
            );
        }
};

SelectInput.defaultProps = {
   // icon : 'ios-person-add-outline',
   // placeholder : 'Age group',
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
        color: "#9b9b9b",
        marginLeft : 20,
    },
    text : {
        fontSize: 16,
        color: "#9b9b9b",
    }
})

export default SelectInput;

