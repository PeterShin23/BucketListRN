import React, {useEffect, useState} from 'react';
import { 
StyleSheet, 
Text, 
TouchableOpacity, 
View,
ScrollView,
FlatList,
Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
// import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertCompletedDate, convertDateToMMDDYYYY, convertDateToYYYYMMDD} from '../utils/dateConverter';
import { useIsFocused } from '@react-navigation/native';
// import { useBucketItems } from '../utils/bucketItemProvider';

export default function HomeScreen({ navigation }) {

    // if on this screen need to refresh basically
    const isFocused = useIsFocused()

    // prepopulate data
    const initialItems = [
        {id:'1', name: "these", dueDate: "20220128", completed: false, completedDate: ""},
        {id:'2', name: "are", dueDate: "20221028", completed: true, completedDate: "20221027"},
        {id:'3', name: "examples", dueDate: "20221028", completed: true, completedDate: "20221028"},
    ]

    // set data
    const [bucketItems, setBucketItems] = useState([])
    const loadItems = async () => {
        try {
            const data = await AsyncStorage.getItem('bucketItems')
            if (data !== null) {
                setBucketItems(JSON.parse(data))
            } else {
                setBucketItems(initialItems)
                await AsyncStorage.setItem('bucketItems', JSON.stringify(initialItems))
            }
        } catch (error) {
            console.log("data is null")
        }
    }

    useEffect(() => {
        loadItems();
    }, [isFocused]);


    // button handler to create item
    const newItemPressHandler = () => {
        navigation.navigate('Add Item');
    }

    // item handler to edit item
    const editItemPressHandler = (item) => {
        navigation.navigate('Edit Item', {item})
    }

    // for checkboxes
    const markItem = itemId => {

        const newItem = bucketItems.map(item => {
            if (item.id == itemId) {
                let updateCompletedDate = new Date()
                updateCompletedDate = updateCompletedDate.toLocaleDateString()
                updateCompletedDate = convertCompletedDate(updateCompletedDate)
                return {...item, completed: !item.completed, completedDate: updateCompletedDate};
            }
            return item;
        });
        setBucketItems(newItem);
    };

    const markItemInStorage = async (itemId) => {
        const items = await AsyncStorage.getItem('bucketItems')
        // console.log(itemId)
        // console.log(items)
        let toUpdateItems;
        if (items !== null) {
            toUpdateItems = JSON.parse(items)
            let updateCompleted = !(toUpdateItems.find((el)=>el.id == itemId).completed)

            // set completedDate based on new completed boolean
            if (updateCompleted) {
                let updateCompletedDate = new Date()
                updateCompletedDate = updateCompletedDate.toLocaleDateString()
                updateCompletedDate = convertCompletedDate(updateCompletedDate)
                toUpdateItems.find((el)=>el.id == itemId).completedDate = updateCompletedDate
            } else {
                toUpdateItems.find((el)=>el.id == itemId).completedDate = ''
            }

            toUpdateItems.find((el)=>el.id == itemId).completed = updateCompleted
            await AsyncStorage.setItem('bucketItems', JSON.stringify(toUpdateItems))
            // const checkItems = await AsyncStorage.getItem('bucketItems')
            // let check = toUpdateItems = JSON.parse(checkItems)
            // console.log(check.find((el)=>el.id == itemId))
        }
    }

    // return list of items in FlatList style
    const ListItem = ({item}) => {
        return (
        <View style={styles.listItem}>
            {item?.completed && (
                <TouchableOpacity style={styles.notCheckedButton} onPress={() => { markItem(item.id), markItemInStorage(item.id)} }>
                    <Icon name="check" size={18} color={'#eef5db'}></Icon>
                </TouchableOpacity>
            )}
            {!item?.completed && (
                <TouchableOpacity style={styles.checkedButton} onPress={() => { markItem(item.id), markItemInStorage(item.id)} }>
                    <Icon name="check" size={18} color={'#eef5db'}></Icon>
                </TouchableOpacity>
            )}
            <View style={{flex:1}}>
                <Text style={[styles.text, 
                    {textDecorationLine: item?.completed ? 'line-through' : 'none'}
                ]}>
                    {item?.name}
                </Text>
            </View>
            <View>
                <Text style={styles.text}>
                    {convertDateToMMDDYYYY(item?.dueDate)}
                </Text>
            </View>
        </View>
        );    
    }
    
        return (
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollingIndicator={true}
                    contentContainerStyle={{padding:20, paddingBottom:100}}
                    data={bucketItems.sort((a,b) => a.completed-b.completed || a.completedDate.localeCompare(b.completedDate) || a.dueDate.localeCompare(b.dueDate))}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({item}) => 
                        <TouchableOpacity onPress={() => editItemPressHandler(item)}>
                            <ListItem item={item} />
                        </TouchableOpacity>
                    }
                />
                <TouchableOpacity style={styles.addButton} onPress={newItemPressHandler}>
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
    text: {
        color: '#4f6367',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listItem: {
        padding: 20,
        backgroundColor: '#eef5db',
        flexDirection: 'row',
        elevation: 10,
        borderRadius: 7,
        marginVertical: 10,
    },
    addButton: {
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
    },
    notCheckedButton: {
        height: 20,
        width: 20,
        backgroundColor: '#fe5f55',
        justifyContent: 'center',
        alignItems: 'center', 
        marginRight: 20,
        borderRadius: 3,
        elevation: 3,
    },
    checkedButton: {
        height: 20,
        width: 20,
        backgroundColor: '#eef5db',
        borderColor: '#fe5f55',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        marginRight: 20,
        borderRadius: 3,
        elevation: 3,
    }

})

// export default HomeScreen