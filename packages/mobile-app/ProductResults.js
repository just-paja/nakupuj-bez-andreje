import React from 'react';

import {NotOwned} from './NotOwned';
import {Owned} from './Owned';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function ProductResults ({ code, onBack }) {
  const owned = true
  console.log(code)
  return (
    <SafeAreaView>
      <View>
        <Text>Výsledek skenu</Text>
        <Text>{code.data}</Text>
        <Button onPress={onBack} title="Zpět" />
      </View>
      <View>
        {owned ? <Owned /> : <NotOwned />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
});
