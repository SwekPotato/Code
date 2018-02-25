import React from 'react';
import { TouchableOpacity, View, Text, Dimensions, StyleSheet } from 'react-native';
import { color, fonts } from '../setting';
import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window');

const FooterButton = ({ title, onPress, disable }) => {
    return(
        <TouchableOpacity
            activeOpacity={disable ? 1 : 0.2}
            onPress={() => {
                if(disable){
                    return false;
                }else{
                    onPress();
                }
            }}
            style={[styles.container, { backgroundColor : disable ? "#dcdcdc" : color.primary}]}>
            <Text style={[styles.title, { color :  disable ? "#9b9b9b" : 'white'}]}>{title}</Text>
        </TouchableOpacity>
    )
}

FooterButton.defaultProps = {
    title : 'Sign Up',
    disable : false
};

FooterButton.propTypes = {
    disable : PropTypes.bool,
}

const styles = StyleSheet.create({
    container : {
        width : width,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        position : 'absolute',
        bottom : 0,
    },
    title : {
        fontFamily: fonts.regular,
        fontSize: 20,
    }
})

export default FooterButton;