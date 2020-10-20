/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {RNCamera} from 'react-native-camera';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import {Reader} from './components/Reader'
import {ProductResults} from './components/ProductResults';

function App () {
  const [code, setCode] = React.useState({"bounds": {"height": 1440, "origin": [[Object], [Object]], "width": 1920}, "data": "8594057632038", "target": 63, "type": "EAN_13"})
  console.log(code)
  if (code) {
    return <ProductResults code={code} onBack={() => setCode(null)} />
  }
  return <Reader onCode={setCode} />
};

const styles = StyleSheet.create({
});

export default App;
