import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { color, fonts } from '../setting';

const {width, height} = Dimensions.get('window');
const Button = ({title, onPress, style, color}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Text style={[styles.title, { color : color}]}>{title}</Text>
        </TouchableOpacity>
    )
}

Button.defaultProps = {
    title : 'Existing user?',
    color: color.primary
}

const styles = StyleSheet.create({
    container: {
        width : width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        lineHeight : 22,
        fontFamily: fonts.regular,
        fontSize: 17,
        textAlign: "center",
    }
})

export default Button