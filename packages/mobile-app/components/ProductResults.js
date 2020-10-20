import React from 'react';
import agrofertList from 'agrofert-list';

import {NotOwned} from './NotOwned';
import {Owned} from './Owned';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const companies = agrofertList.filter(company => Boolean(company.barcodePrefix))
console.log(companies)


export function ProductResults ({ code, onBack }) {
  const match = companies.find(company => code.data.startsWith(company.barcodePrefix))
  return (
    <SafeAreaView>
      <View>
        <Text>Výsledek skenu</Text>
      </View>
      <View>
        {match ? <Owned company={match} /> : <NotOwned />}
      </View>
      <View>
        <Button onPress={onBack} title="Skenovat další" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
});
