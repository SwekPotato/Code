import React from 'react'
import { StyleSheet, Image, View } from 'react-native';

const ProfilePicture = (props) => (
    <View>
        <Image 
            style={styles.image}
            source={{uri: props.image}}
        />
    </View>
)

const styles = StyleSheet.create ({
    image: {
        width: 50,
        height: 50,
    }
})

export default ProfilePicture