import React from 'react'
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Title = ({style}) => {
    return(
        <View style={[styles.container, style]}>
            <Image source={require('../../assets/images/3Logo.png')} style={styles.image}/>            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image : {

    },
})

export default Title
