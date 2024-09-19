import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button } from 'react-native-web';

export default function HomeScreen() {
    const width = useSharedValue(50);

    const handlePress = () => {
      width.value += 10;
    };
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring( width.value * 2) }],
      }));
  return (
    <View style={[styles.mainContainer , animatedStyles]}>
     <Animated.View style={[styles.box, animatedStyles]} />
      <View style={styles.container}>
        <Button onPress={handlePress} title="Click me" />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box: {
        height: 120,
        width: 120,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        marginVertical: 50,
      },
})