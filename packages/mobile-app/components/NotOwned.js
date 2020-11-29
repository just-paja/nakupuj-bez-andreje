import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

export function NotOwned ({ code }) {
  return (
    <View>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.beCalm}>Toto není Andrejovo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  beCalm: {
    color: '#090',
    fontSize: 24,
  },
  code: {
    textAlign: 'center',
  }
});
