import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { color, fonts } from '../setting';
import OriginalDatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get('window');

class DatePicker extends Component {
    state={
        isFocus : false,
    }
    render() {
        const {
            placeholder, type, icon, onChangeText, value, isSecure,
            defaulttext, date, onDateChange, mode, format
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.innerContainer, { 
                    borderBottomColor : this.state.isFocus ? color.primary : '#dcdcdc'
                    }]}>
                    <Text style={styles.text}>{defaulttext}</Text>
                    <Icon name={icon} size={30} color='#9b9b9b'/>
                    <OriginalDatePicker
                        // value={value}
                        // onChangeText={onChangeText}
                        // keyboardType={type}
                        // underlineColorAndroid ={'transparent'}
                        // placeholder={placeholder}
                        // onFocus={() => this.setState({ isFocus : true })}
                        // autoCapitalize = 'none'
                        // style={styles.textInput}
                        // secureTextEntry={isSecure}
                        // onEndEditing={() => this.setState({ isFocus : false })}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        mode={mode}
                        showIcon={false}
                        format={format}
                        customStyles={{
                            dateIcon : styles.dateIcon,
                            dateInput : styles.dateInput,
                            dateTouchBody : styles.dateTouchBody
                          }}
                        style= {styles.datePicker}                       
                        onDateChange={onDateChange}
                        date={date}
                    />
                </View>
            </View>
            );
        }
};

DatePicker.defaultProps = {
    //icon : 'ios-mail-outline',
    type : 'default',
    placeholder : 'hello@gmail.com',
    isSecure : false
}

DatePicker.propTypes = {
    onChangeText : PropTypes.func,
    value : PropTypes.string,
    type : PropTypes.string, // default, numeric , email-address, phone-pad
    date : PropTypes.any,
    onDateChange : PropTypes.func,
    mode : PropTypes.string,
    format: PropTypes.any,
}

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
        lineHeight : 30,
        fontFamily: fonts.regular,
        fontSize: 19,
        color: "black", //"#9b9b9b",
        marginLeft : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text : {
        fontSize: 17,
        fontFamily: fonts.regular,
        color: "#9b9b9b",
    },

    dateIcon: {
        width: 0,
        height: 0,
        margin: 0,
      },
      
      dateInput: {
          marginLeft: 36,
          borderWidth: 0,
          height: 40,
      },

      dateTouchBody: {
          width: "100%"
      },
      // ... You can check the source to find the other keys. 
      
      datePicker: {
        
      }
})

export default DatePicker;

