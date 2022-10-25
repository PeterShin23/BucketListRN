import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function HomeScreen({ navigation }) {

    const newItemPressHandler = () => {
        navigation.navigate('Add Item');
    }

    return (
        <View style={styles.body}>
            <Text>BucketList</Text>
            <TouchableOpacity style={styles.button} onPress={newItemPressHandler}>
                <Icon name="plus" size={20} color={'#eef5db'}></Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#eef5db',
    },
    // text: {
    //     color: '#4f6367',
    //     fontSize: 20,
    //     margin: 10,
    // },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fe5f55',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'absolute',
        bottom: 15,
        right: 15,
        elevation: 5,
    }

})

// export default HomeScreen