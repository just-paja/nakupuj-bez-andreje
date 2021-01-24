import React from 'react'

import { StyleSheet, Text } from 'react-native'

export function HistoryEmpty () {
  return <Text style={styles.root}>Nic zatím nebylo naskenováno</Text>
}

const styles = StyleSheet.create({
  root: {}
})
