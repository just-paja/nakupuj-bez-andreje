import React from 'react'

import { Button, Text, View, StyleSheet } from 'react-native'

export function ReaderMenu ({ onGoToHistory }) {
  return (
    <View style={styles.root}>
      <View>
        <Text>Nakupuj Bez Andreje</Text>
      </View>
      <Button onPress={onGoToHistory} title='Historie' />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  }
})
