import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { color, fonts } from '../setting';

const { width, height } = Dimensions.get('window');

class TextInputComp extends Component {
    state={
        isFocus : false,
    }
    render() {
        const {
            placeholder, type, icon, onChangeText, value, isSecure
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.innerContainer, { 
                    borderBottomColor : this.state.isFocus ? color.primary : '#dcdcdc'
                    }]}>
                    <Icon name={icon} size={30} color='#9b9b9b'/>
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={type}
                        underlineColorAndroid ={'transparent'}
                        placeholder={placeholder}
                        onFocus={() => this.setState({ isFocus : true })}
                        style={styles.textInput}
                        secureTextEntry={isSecure}
                        onEndEditing={() => this.setState({ isFocus : false })}
                    />
                </View>
            </View>
            );
        }
};

TextInputComp.defaultProps = {
    icon : 'ios-mail-outline',
    type : 'default',
    placeholder : 'hello@gmail.com',
    isSecure : false

}

TextInputComp.propTypes = {
    onChangeText : PropTypes.func,
    value : PropTypes.string,
    type : PropTypes.string, // default, numeric , email-address, phone-pad

}

const styles = StyleSheet.create({
    container : {
        width : width,
        paddingLeft : 50,
        paddingRight : 50,
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
        fontSize: 16,
        color: "#9b9b9b",
        marginLeft : 20,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default TextInputComp;

