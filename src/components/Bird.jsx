// Bird.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Bird({ position }) {
  return (
    <View style={[styles.bird, { top: position }]} />
  );
}

const styles = StyleSheet.create({
  bird: {
    width: 40,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 20,
    position: 'absolute',
    left: 50, // Fixed position on the x-axis
  },
});
