import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/Navigation/Navigation'
import HomeScreen from './src/Screens/HomeScreen'

export default function App() {
  return (
   <>
   {/* <NavigationContainer>
    <Navigation/>
   </NavigationContainer> */}
   <HomeScreen/>
   </>
  )
}

const styles = StyleSheet.create({
mainContainer:{
  flex:1,
  backgroundColor:"blue"
}




})