import React from 'react';
import andrej from './andrej-pin.png'

import { Image, StyleSheet, Text, View } from 'react-native';

export function Owned ({ company }) {
  return (
    <>
      <View style={styles.labels}>
        <Text style={styles.text}>{company.name}</Text>
        <Text style={styles.warning}>Toto je Andrejovo</Text>
      </View>
      <Image source={andrej} style={styles.illustration} />
    </>
  )
}

const styles = StyleSheet.create({
  warning: {
    color: '#f00',
    fontSize: 24,
    marginTop: 8,
  },
  labels: {
    display: 'flex',
    alignItems: 'center',
  },
  illustration: {
    marginTop: 24,
  }
});
