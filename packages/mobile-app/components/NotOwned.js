import React from 'react';

import { Image, StyleSheet, Text } from 'react-native';

export function NotOwned () {
  return (
    <Text style={styles.beCalm}>Toto není Andrejovo</Text>
  )
}

const styles = StyleSheet.create({
  beCalm: {
    color: '#090',
    fontSize: 24,
  }
});
