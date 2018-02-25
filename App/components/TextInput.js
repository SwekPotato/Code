import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput as Input, View } from 'react-native'
import ErrorMessage from './ErrorMessage'
import Label from './Label'

function isPromise(value) {
    if (typeof value !== 'object') {
        return false
    }
    if (typeof value.then !== 'function') {
        return false
    }
    return true
}

class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.value,
            error: null
        }
    }

    handleChangeText = (text) => {
        this.props.onChange(text)
        this.setState({ text })
    }

    handleBlur = () => {
        const result = this.props.validate && this.props.validate(this.state.text)    
        if (result) {
            if (isPromise(result)) {
                result.then((error) => {
                    this.setState({ error })
                })
            } else {
                this.setState({ error: result })
            }
        } else {
            this.setState({ error: null })
        }
    }

    render() {
        return (
            <View style={[
                styles.container,
            ]}>
                <Label text={this.props.label} size={this.props.size} />
                <Input
                    value={this.props.value}
                    style={[
                        styles.input,
                        { fontSize: this.props.size || 26 },
                    ]}
                    onChangeText={this.handleChangeText}
                    onBlur={this.handleBlur}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                {this.state.error && (
                    <ErrorMessage text={this.state.error} />
                )}
            </View>
        )
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    size: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    validate: PropTypes.func,
}

const styles = StyleSheet.create({
    input: {
        color: 'black',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    container: {
        margin: 10,
    }
})

export default TextInput