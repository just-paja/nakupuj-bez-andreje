import React from 'react';
import agrofertList from 'agrofert-list';

import {findMatch} from '../matcher';
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

export function ProductResults ({ code, onGoToHistory, onGoToScan }) {
  if (!code) {
    return null
  }
  const match = findMatch(code)
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader label="Výsledek skenu" />
      <View style={styles.column}>
        {match ? <Owned code={code} company={match} /> : <NotOwned code={code} />}
      </View>
      <View style={styles.footer}>
        <View style={styles.button}>      
          <Button onPress={onGoToHistory} title="Historie" />
        </View>
        <View style={styles.button}>      
          <Button onPress={onGoToScan} title="Skenovat další" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
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
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
