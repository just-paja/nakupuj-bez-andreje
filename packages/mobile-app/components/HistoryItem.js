import React from 'react'

import { findMatch } from '../matcher'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export function HistoryItem ({ code, onGoToResult }) {
  const match = findMatch(code)
  return (
    <TouchableWithoutFeedback onPress={() => onGoToResult(code)}>
      <View style={styles.root}>
        <Text>{code}</Text>
        <Text>{match ? 'Andrejovo' : 'OK'}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
})
