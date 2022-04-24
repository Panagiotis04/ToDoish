import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

const Order = (props) => {
    const iconMap = new Map();
    iconMap.set('albert', require('./assets/albertHeijn.png'));
    iconMap.set('amazon', require('./assets/amazon.png'));

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.itemName}>
                    <Text style={styles.itemTitle}>{props.text}</Text>
                    <View style={styles.orderDate}>
                        <Text style={styles.orderDate}>{'Order date: '} {props.date1}</Text>
                        <View>
                            <Text style={styles.estimateArrival}>{'Estimate arrival: '}{props.date2}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
            <Image source={iconMap.has(props.image) ? iconMap.get(props.image) : iconMap.get('notFound')} style={styles.icon} />
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
    itemName: {
        alignItems: 'baseline'
    },
    orderDate: {
        justifyContent: 'space-between',
        position: 'relative',
        fontStyle: 'italic'
    },
    estimateArrival: {
        position: 'relative',
        fontStyle: 'italic'
    },
    itemLeft: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
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
        width: 50,
        height: 50,
    }
});

export default Order;