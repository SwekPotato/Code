import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { color, fonts } from '../setting';

const {width, height} = Dimensions.get('window');
const SmallButton = ({title, onPress, style}) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={onPress} style={styles.innerContainer}>
                <Text style={styles.title}>{title}</Text>                
            </TouchableOpacity>
        </View>
    )
}

SmallButton.defaultProps = {
    title : '',
}

const styles = StyleSheet.create({
    container: {
        width : width,
        height : 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer : {
        width : width - (36*2),
        height : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : color.primary
    },
    title: {
        width: 70,
        height: 22,
        lineHeight : 22,
        fontFamily: fonts.regular,
        fontSize: 16,
        textAlign: "center",
        color: "#ffffff"
    }
})

export default SmallButton;