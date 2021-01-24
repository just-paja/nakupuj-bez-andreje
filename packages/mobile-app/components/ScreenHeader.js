import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

export function ScreenHeader ({ label }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    paddingBottom: 12,
    paddingTop: 12
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#666'
  }
})
