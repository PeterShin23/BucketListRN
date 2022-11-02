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
import {convertDateToMMDDYYYY} from '../utils/dateConverter';
import { useIsFocused } from '@react-navigation/native';
// import { useBucketItems } from '../utils/bucketItemProvider';

export default function HomeScreen({ navigation }) {

    // if on this screen need to refresh basically
    const isFocused = useIsFocused()

    // prepopulate data
    const initialItems = [
        {id:'1', name: "finish this bucket item", dueDate: "20220128", completed: false, completedDate: ""},
        {id:'2', name: "finished item!", dueDate: "20221028", completed: true, completedDate: ""},
    ]

    // set data
    const [bucketItems, setBucketItems] = useState(initialItems)
    const loadItems = async () => {
        try {
            const data = await AsyncStorage.getItem('bucketItems')
            if (data !== null) {
                setBucketItems(JSON.parse(data))
            }
            console.log("this is the storage: " + data)
        } catch (error) {
            Alert.alert("Could not load items")
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
    const markItem = (itemId) => {
        const newItem = bucketItems.map(item => {
            if (item.id == itemId) {
                return {...item, completed: !item.completed};
            }
            return item;
        });
        setBucketItems(newItem);
      };

    // return list of items in FlatList style
    const ListItem = ({item}) => {
        return (
        <View style={styles.listItem}>
            {item?.completed && (
                <TouchableOpacity style={styles.notCheckedButton} onPress={() => markItem(item.id)}>
                    <Icon name="check" size={18} color={'#eef5db'}></Icon>
                </TouchableOpacity>
            )}
            {!item?.completed && (
                <TouchableOpacity style={styles.checkedButton} onPress={() => markItem(item.id)}>
                    <Icon name="check" size={18} color={'#eef5db'}></Icon>
                </TouchableOpacity>
            )}
            {/* <CheckBox value={item.completed} onValueChange={(value) => !item.completedDate}></CheckBox> */}
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
                    data={bucketItems.sort((a,b) => a.completed-b.completed || a.dueDate.localeCompare(b.dueDate) || a.completedDate.localeCompare(b.completedDate))}
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