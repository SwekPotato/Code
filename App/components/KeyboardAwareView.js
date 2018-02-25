import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView as View } from 'react-native-keyboard-aware-scroll-view'

const KeyboardAwareView = (props) => (
    <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
    >
        <View>
            {props.children}
        </View>
    </TouchableWithoutFeedback>
)

export default KeyboardAwareView;