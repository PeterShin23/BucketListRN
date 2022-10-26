import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function NewItem() {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateText, setText] = useState('Select Due Date')

    return (
        <View style={styles.body}>
            <TextInput style={styles.input} placeholder="Bucket Item"></TextInput>
            {/* <Button title="Due Date" onPress={() => setOpen(true)} /> */}
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
            <TouchableOpacity style={styles.button}>
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
