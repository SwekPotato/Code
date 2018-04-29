import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, Platform  } from 'react-native';
import PropTypes from 'prop-types'
import { fonts, color } from '../setting';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Header = ({ title, onPress, mode, rightButton, style, icon}) => {
    if(mode == 'home'){
        return(
            <View style={[styles.container, style]} >
                {/* <Text style={styles.title}>{title.toUpperCase()}</Text> */}
                <Text style={styles.title}>{title}</Text>
            </View>
        )    
    }else if(mode == 'normal'){
        return(
            <View style={[styles.container, style]} >
                {/* <Text style={styles.title}>{title.toUpperCase()}</Text> */}
                <Text style={styles.title}>{title}</Text>
                {
                    rightButton && (
                        <Icon
                            style={styles.icon}
                            name={icon}
                            size={45} color='#ffffff'
                            onPress={onPress} />
                    )
                }
            </View>
        )
    }else if(mode == 'logo'){
        return(
            <View style={[styles.container, style]} >
                <Image source={require('../../assets/images/headerbar.png')}/>
                {
                    rightButton && (
                        <Icon
                            style={styles.icon}
                            name={'ios-add'}
                            size={50} color='#ffffff'
                            onPress={onPress} />
                    )
                }
            </View>
        )
    } 
    
};

Header.defaultProps = {
    title : 'login', 
    onPress : () => console.log('header on press'),
    mode : 'normal',
    rightButton : true, // If true, show the right button
    icon : 'ios-close-outline'
}

Header.propTypes = {
    title : PropTypes.string,
    onPress : PropTypes.func,
    mode : PropTypes.string,
    rightButton : PropTypes.bool,
}

const styles = StyleSheet.create({
    container : {
        width : width,
        backgroundColor : color.primary,
        alignItems: 'center',
        justifyContent : 'center',
        ...Platform.select({
            ios: {
                paddingTop: 10,
                height : 70,
            },
            android: {
                height : 60,
            },
        })
        
    },
    title : {
        fontFamily: fonts.regular,
        fontSize: 20,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#ffffff",
    },
    icon : {
        position : 'absolute',
        right : 25,
        ...Platform.select({
            ios: {
                top : 20,
            },
            android: {
                
            },
        })
    }
});

export default Header;