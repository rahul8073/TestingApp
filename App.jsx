import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/Navigation/Navigation'

export default function App() {
  return (
   <>
   <NavigationContainer>
    <Navigation/>
   </NavigationContainer>
   </>
  )
}

const styles = StyleSheet.create({
mainContainer:{
  flex:1,
  backgroundColor:"blue"
}




})