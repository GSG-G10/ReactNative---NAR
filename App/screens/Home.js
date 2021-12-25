import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';


export default function Home() {
  return (
    <View style={styles.container}>
      <Text> Projects</Text>
      <EvilIcons name="search" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row'
  }
})