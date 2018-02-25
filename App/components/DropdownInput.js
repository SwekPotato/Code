import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import {Select, Option } from 'react-native-chooser'
import Label from './Label'

const Dropdowninput = (props) => (
    <View style={styles.container}>
        <Label text={props.label} />
        <Select 
            selected={props.value}
            onSelect={props.onChange}
            style={styles.optionContainer}
        >
            {props.options.map(element => (
                <Option key={element} value={element}>{element}</Option>
            ))}
        </Select>
    </View>
)

Dropdowninput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    onChange: PropTypes.func,
}

const styles = StyleSheet.create ({
    container: {
        margin: 10,
    },
    optionContainer: {
        backgroundColor: '#FFFFFF',
    },
})

export default Dropdowninput