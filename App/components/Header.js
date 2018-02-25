import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image, Platform  } from 'react-native';
import PropTypes from 'prop-types'
import { fonts, color } from '../setting';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Header = ({ title, onPress, mode, rightButton, style, icon}) => {
    if(mode == 'normal'){
        return(
            <View style={[styles.container, style]} >
                <Text style={styles.title}>{title.toUpperCase()}</Text>
                {
                    rightButton && (
                        <Icon
                            style={styles.icon}
                            name={icon}
                            size={50} color='#ffffff'
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
    title : 'login', // mode가 logo 일때는 타이틀이 요구되지 않음.
    onPress : () => console.log('header on press'),
    mode : 'normal', //normal : 상단에 타이틀과 닫기 표시가 있는 헤더, logo : 로고가 있는 헤더
    rightButton : true, // 외쪽 버튼이 필요 없으면 false
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
                paddingTop: 20,
                height : 80,
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