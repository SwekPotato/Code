import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native' 
import PropTypes from 'prop-types';
import { color, fonts } from '../setting';

const { width, height } = Dimensions.get('window');

const ErrorMessage = (props) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            {props.text}
        </Text>
    </View>
)

const styles = StyleSheet.create ({
    container: {
        width : width,
        height : 20,
        paddingLeft : 50,
        paddingRight : 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    text: {
        color: color.primary,
        fontFamily: fonts.regular,
        fontSize: 14,
    }
})

ErrorMessage.defaultProps = {
    text : 'Sorry, please try again',
}

ErrorMessage.propTypes = {
    text: PropTypes.string
}

export default ErrorMessage