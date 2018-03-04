import React from 'react';
import {
    Modal, View, Text, StyleSheet, Dimensions, TouchableOpacity,
    FlatList
} from 'react-native';
import { color, fonts } from '../setting';

const { width, height } = Dimensions.get('window');

const listGroup = {
    ageGroup : ['13 - 17','18 - 24','25 - 44','45 - 64', '65 -'],
    securityQuestion : [
        'What is your best friend first name?',
        'What is your favorite food?',
        'What is your favorite movie?'
    ],
    timezone : [
        'Korea',
        'U.S. (PST)'     
    ]
};

// divison is the chosen value from listgroup

const ListItem = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
        <Text style={styles.listItemText}>{title}</Text>
    </TouchableOpacity>
)

const OptionModal = ({ visible, onClose, division }) => {
    return (
        <Modal
            visible={visible}
            animationType={'none'}
            transparent={true}
            onRequestClose={() => onClose('none')}>
            <TouchableOpacity style={styles.container} onPress={() => onClose('none')} activeOpacity={1}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={listGroup[division]}
                        renderItem={({item}) => <ListItem
                                title={item}
                                onPress={() => onClose(item)}/>}
                        keyExtractor={(item, index) => index}
                    />
                </View> 
            </TouchableOpacity>
        </Modal>        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'flex-end',
        backgroundColor : 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer : {
        width : width,
        height : 230,
        backgroundColor : 'white',
    },
    listItem : {
        width : width,
        height : 56,
        alignItems: 'center',
        justifyContent : 'center'
    },
    listItemText : {
        fontFamily: fonts.regular,
        fontSize: 20,
        color: "#4a4a4a"
    }
})

export default OptionModal;