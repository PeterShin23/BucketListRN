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
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/screens/home'
import NewItem from './src/screens/newItem';
import EditItem from './src/screens/editItem';

const Stack = createNativeStackNavigator()

const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='My Bucket List'>
        <Stack.Screen name="My Bucket List" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Add Item" component={NewItem}></Stack.Screen>
        <Stack.Screen name="Edit Item" component={EditItem}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.body}>
    //   <Text style={styles.text}>Let's start here</Text>
    //   <Button title="Press me"></Button>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: '#eef5db',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#4f6367',
//     fontSize: 20,
//     // fontStyle: 'ariel',
//     margin: 10,
//   },
// });

export default App;
