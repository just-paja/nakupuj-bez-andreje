import andrej from './andrej-pin.png'
import React from 'react'

import { Image, StyleSheet, Text, View } from 'react-native'

export function Owned ({ code, company }) {
  return (
    <>
      <View style={styles.labels}>
        <View>
          <Text>{code}</Text>
        </View>
        <View>
          <Text>{company.name}</Text>
        </View>
        <View>
          <Text style={styles.warning}>Toto je Andrejovo</Text>
        </View>
      </View>
      <Image source={andrej} style={styles.illustration} />
    </>
  )
}

const styles = StyleSheet.create({
  warning: {
    color: '#f00',
    fontSize: 24,
    marginTop: 8
  },
  labels: {
    display: 'flex',
    alignItems: 'center'
  },
  illustration: {
    marginTop: 24
  }
})
