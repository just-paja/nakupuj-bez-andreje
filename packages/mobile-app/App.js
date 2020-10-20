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
  const [code, setCode] = React.useState(null)
  console.log(code)
  if (code) {
    return <ProductResults code={code} onBack={() => setCode(null)} />
  }
  return <Reader onCode={setCode} />
};

const styles = StyleSheet.create({
});

export default App;
