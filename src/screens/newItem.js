import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDateToYYYYMMDD } from '../utils/dateConverter';
import uid from '../utils/uid'
import DatePicker from 'react-native-date-picker';
// import { useBucketItems } from '../utils/bucketItemProvider';

export default function NewItem({navigation}) {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState('')
    const [dateText, setText] = useState('Select Due Date') 
    // const {bucketItems, setBucketItems} = useBucketItems()

    const onSavePressHandler = async () => {
        if (itemName == '' || dateText == 'Select Due Date') {
            Alert.alert('Oops!', 'Set an item and a due date')
        } else {
            let dateForStorage = convertDateToYYYYMMDD(dateText)

            var newItem = {
                id: uid(),
                name: itemName,
                dueDate: dateForStorage,
                completed: false,
                completedDate: '',
            }

            const items = await AsyncStorage.getItem('bucketItems')
            let updatedItems;
            if (items !== null) {
                updatedItems = JSON.parse(items)
                updatedItems.push(newItem)
            } else {
                updatedItems = [newItem]
            }
            // setBucketItems(updatedItems)
            await AsyncStorage.setItem('bucketItems', JSON.stringify(updatedItems))

            // test
            // const inStorage = await AsyncStorage.getItem('bucketItems')
            // console.log(inStorage)

            navigation.navigate('My Bucket List')

            // try {
            //     var bucketItem = {
            //         'id': uid(),
            //         'name': itemName,
            //         'dueDate': dateForStorage,
            //         'completed': false,
            //         'completedDate': '',
            //     }
            //     await AsyncStorage.setItem('bucketItems', JSON.stringify(bucketItem))

            //     // test
            //     // const inStorage = await AsyncStorage.getItem(bucketItem.id)
            //     // console.log(inStorage)

            //     navigation.navigate('My Bucket List')
            // } catch (error) {
            //     Alert.alert("Error", "Failed to Make Bucket Item")
            // }
        }
    }

    return (
        <View style={styles.body}>
            <TextInput 
                style={styles.input} 
                placeholder="Bucket Item"
                value={itemName}
                onChangeText={(value) => setItemName(value)}    
            ></TextInput>
            <Pressable onPress={() => setOpen(true)}>
                <Text style={styles.text}>{dateText}</Text>
            </Pressable>
            <DatePicker modal mode="date" open={open} date={date}
                onConfirm={(date) => {
                    let tempDate = new Date(date)
                    let fDate = (tempDate.getMonth()+1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
                    setText("Due Date: " + fDate)
                    setOpen(false) 
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            ></DatePicker>
            <TouchableOpacity style={styles.button} onPress={() => onSavePressHandler()}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#eef5db',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: '#252525',
        fontSize: 20,
        margin: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#4f6367',
        borderRadius: 10,
        backgroundColor: '#eef5db',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: 90,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fe5f55',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'absolute',
        bottom: 40,
        elevation: 5,
    },
    buttonText: {
        color: '#eef5db',
        fontSize: 16,
    },
})
