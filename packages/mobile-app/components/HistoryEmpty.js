import React from 'react';
import agrofertList from 'agrofert-list';

import {NotOwned} from './NotOwned';
import {Owned} from './Owned';
import {ScreenHeader} from './ScreenHeader';
import {getHistory} from '../storage';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function HistoryEmpty () {
  return (
    <Text style={styles.root}>Nic zatím nebylo naskenováno</Text>
  )
}

const styles = StyleSheet.create({
  root: {
  },
});
