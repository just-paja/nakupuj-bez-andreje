import React from 'react';
import agrofertList from 'agrofert-list';

import {getHistory} from '../storage';
import {HistoryEmpty} from './HistoryEmpty';
import {HistoryItem} from './HistoryItem';
import {NotOwned} from './NotOwned';
import {Owned} from './Owned';
import {ScreenHeader} from './ScreenHeader';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function ScanHistory ({ code, onGoToResult, onGoToScan }) {
  const [history, setHistory] = React.useState([])
  React.useEffect(() => {
    getHistory().then(setHistory).catch((e) => {})
  }, [])
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader label="Historie skenování" />
      <View>
        {history.length === 0 
          ? <HistoryEmpty />
          : history.map(code => (
            <HistoryItem
              onGoToResult={onGoToResult}
              key={code}
              code={code} 
            />
          ))}
      </View>
      <View style={styles.footer}>
        <Button onPress={onGoToScan} title="Skenovat kódy" />
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
    alignItems: 'center',
  },
  footer: {
    padding: 16
  }
});
