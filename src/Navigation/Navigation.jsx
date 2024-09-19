import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen';

export default function Navigation() {
    const stack=createStackNavigator();
  return (
    <stack.Navigator initialRouteName='Home'>
       <stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
    </stack.Navigator>
  )
}