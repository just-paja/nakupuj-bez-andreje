import React from 'react'

import { getHistory } from '../storage'
import { HistoryEmpty } from './HistoryEmpty'
import { HistoryItem } from './HistoryItem'
import { ScreenHeader } from './ScreenHeader'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'

function getHistoryList (history, code, onGoToResult) {
  if (history.length === 0) {
    return <HistoryEmpty />
  }

  return history.map(code => (
    <HistoryItem onGoToResult={onGoToResult} key={code} code={code} />
  ))
}

export function ScanHistory ({ code, onGoToResult, onGoToScan }) {
  const [history, setHistory] = React.useState([])
  React.useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(e => {})
  }, [])
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader label='Historie skenování' />
      <View>{getHistoryList(history, code, onGoToResult)}</View>
      <View style={styles.footer}>
        <Button onPress={onGoToScan} title='Skenovat kódy' />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  column: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    padding: 16
  }
})
