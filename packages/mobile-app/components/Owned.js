import React from 'react';
import andrej from './andrej-pin.png'

import { Image, StyleSheet, Text } from 'react-native';

export function Owned () {
  return (
    <>
      <Text>Toto je Andrejovo</Text>
      <Image source={andrej} />
    </>
  )
}

const styles = StyleSheet.create({
});
