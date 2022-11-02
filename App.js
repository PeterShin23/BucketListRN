/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { Provider } from 'react-redux'
import { Store } from './redux/store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './src/screens/home'
import NewItem from './src/screens/newItem';
import EditItem from './src/screens/editItem';

const Stack = createNativeStackNavigator()

const App: () => Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='My Bucket List'>
        <Stack.Screen name="My Bucket List" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Add Item" component={NewItem}></Stack.Screen>
        <Stack.Screen name="Edit Item" component={EditItem}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
