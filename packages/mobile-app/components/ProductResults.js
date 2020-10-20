import React from 'react';
import agrofertList from 'agrofert-list';

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

const companies = agrofertList.filter(company => Boolean(company.barcodePrefix))

export function ProductResults ({ code, onBack }) {
  const match = companies.find(company => code.data.startsWith(company.barcodePrefix))
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader label="Výsledek skenu" />
      <View style={styles.column}>
        {match ? <Owned company={match} /> : <NotOwned />}
      </View>
      <View>
        <Button onPress={onBack} title="Skenovat další" />
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
  }
});
