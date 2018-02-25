import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Label = (props) => {
    const { text } = props
    return (
        <Text 
            style={[
                styles.label,
                { fontSize : props.size || 26 },
            ]}
        >
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'blue',
    }
})

export default Label