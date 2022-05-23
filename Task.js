import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

const Task = (props) => {
    const iconMap = new Map();
    iconMap.set('biking', require('./assets/biking.png'));
    iconMap.set('boxing', require('./assets/boxing.png'));
    iconMap.set('gym', require('./assets/gym.png'));
    iconMap.set('notes', require('./assets/notes.png'))
    iconMap.set('notFound', require('./assets/empty-set.png'))
    iconMap.set('ergent', require('./assets/ergent.png'))
    iconMap.set('important', require('./assets/important.png'))
    iconMap.set('notImportant', require('./assets/notImportant.png'))

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image source={iconMap.has(props.image) ? iconMap.get(props.image) : iconMap.get('notFound')} style={styles.icon} />
                <Text style={styles.itemTitle}>{props.text}</Text>
                <Image source={iconMap.get(props.ergent)} style={styles.icon} />
                <Image source={iconMap.get(props.important)} style={styles.icon} />
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        maxWidth: '80%',
    },
    square: {
        width: 32, 
        height: 32, 
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        marginLeft: 10,
        maxWidth: '80%'
    },
    circular: {
        width: 12, 
        height: 12, 
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    icon: {
        width: 30,
        height: 30,
    }
});

export default Task;