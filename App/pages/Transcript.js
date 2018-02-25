import React from 'react'
import { Text } from 'react-native'

const Transcript = (props) => (
    <Text>
        {props.navigation.state.params.historyId}
    </Text>    
)

Transcript.navigationOptions = {
    gesturesEnabled: false,
}

export default Transcript