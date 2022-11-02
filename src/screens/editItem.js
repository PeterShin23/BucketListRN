import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertDateToYYYYMMDD, convertDateToDisplay, convertCompletedDateToDisplay } from '../utils/dateConverter';
import DatePicker from 'react-native-date-picker';

export default function EditItem({route, navigation}) {

    const {item} = route.params

    let storedId = item.id
    let storedCompleted = item.completed
    let storedCompletedDate = item.completedDate

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [itemName, setItemName] = useState(item.name)
    const [dueDateText, setDueDateText] = useState(convertDateToDisplay(item.dueDate)) 
    const [completedDateText, setCompletedDateText] = useState(convertCompletedDateToDisplay(item.completed, item.completedDate))

    const onUpdatePressHandler = async () => {
        if (itemName == '' || dueDateText == 'Select Due Date') {
            Alert.alert('Oops!', 'Set an item and a due date')
        } else {
            let dateForStorage = convertDateToYYYYMMDD(dueDateText)

            var tempItem = {
                id: storedId,
                name: itemName,
                dueDate: dateForStorage,
                completed: storedCompleted,
                completedDate: storedCompletedDate,
            }
            console.log(storedCompleted)
            console.log(storedCompletedDate)
            const items = await AsyncStorage.getItem('bucketItems')
            let toUpdateItems;
            if (items !== null) {
                toUpdateItems = JSON.parse(items)
                toUpdateItems.find((el)=>el.id == storedId).name = tempItem.name;
                toUpdateItems.find((el)=>el.id == storedId).dueDate = tempItem.dueDate;
                toUpdateItems.find((el)=>el.id == storedId).completed = tempItem.completed;
                toUpdateItems.find((el)=>el.id == storedId).completedDate = tempItem.completedDate;
            } else {
                Alert.alert("Oops!", "Can't Update Item")
            }
            await AsyncStorage.setItem('bucketItems', JSON.stringify(toUpdateItems))

            // test
            // const inStorage = await AsyncStorage.getItem('bucketItems')
            // console.log(inStorage)

            navigation.navigate('My Bucket List')
        }
    }

    const onDeletePressHandler = async () => {
        
        const items = await AsyncStorage.getItem('bucketItems')
        let toDeleteItems;
        if (items !== null) {
            toDeleteItems = JSON.parse(items)
            toDeleteItems = toDeleteItems.filter(item => item.id != storedId)
        }
        await AsyncStorage.setItem('bucketItems', JSON.stringify(toDeleteItems))

        // test
        // const inStorage = await AsyncStorage.getItem('bucketItems')
        // console.log(inStorage)

        navigation.navigate('My Bucket List')
    }

    return (

        <View style={styles.body}>
            <TextInput 
                style={styles.input} 
                placeholder="Bucket Item"
                value={itemName}
                multiline={true}
                onChangeText={(value) => setItemName(value)}    
            ></TextInput>
            <Pressable onPress={() => setOpen(true)}>
                <Text style={styles.text}>{dueDateText}</Text>
            </Pressable>
            <DatePicker modal mode="date" open={open} date={date}
                onConfirm={(date) => {
                    let tempDate = new Date(date)
                    let fDate = (tempDate.getMonth()+1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
                    setDueDateText("Due Date: " + fDate)
                    setOpen(false) 
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            ></DatePicker>
            <Text style={styles.text}>{completedDateText}</Text>
            <TouchableOpacity style={styles.updateButton} onPress={() => onUpdatePressHandler()}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDeletePressHandler()}>
                <Text style={styles.buttonText}>Delete</Text>
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
    updateButton: {
        width: 90,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fe5f55',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'absolute',
        bottom: 40,
        left: 80,
        elevation: 5,
    },
    deleteButton: {
        width: 90,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#4f6367',
        justifyContent: 'center',
        alignItems: 'center', 
        position: 'absolute',
        bottom: 40,
        right: 80,
        elevation: 5,
    },
    buttonText: {
        color: '#eef5db',
        fontSize: 16,
    },
})