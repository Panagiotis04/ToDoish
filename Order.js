import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

const Order = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image source={require('./assets/albertHeijn.png')} style={styles.icon} />
                <Text style={styles.itemText}>{props.text}</Text>
                <Text style={styles.itemText}>{'Order date: '} {props.date1}</Text>
                <Text style={styles.itemText}>{'Estimate arrival: '}{props.date2}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF'
        ,
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

export default Order;