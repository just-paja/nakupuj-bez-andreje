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
import {ScanHistory} from './components/ScanHistory';
import {ProductResults} from './components/ProductResults';
import {storeScan} from './storage'

const VIEW_SCAN = 'scan'
const VIEW_RESULT = 'result'
const VIEW_HISTORY = 'history'

function App () {
  const [code, setCode] = React.useState(null)
  const [view, setView] = React.useState(VIEW_SCAN)
  const handleGoToResult = React.useCallback(code => {
    setCode(code)
    setView(VIEW_RESULT)
  })
  const handleScan = React.useCallback(code => {
    storeScan(code.data)
    handleGoToResult(code.data)
  }, [handleGoToResult])
  const handleGoToHistory = React.useCallback(() => setView(VIEW_HISTORY))
  const handleGoToScan = React.useCallback(() => {
    setCode(null)
    setView(VIEW_SCAN)
  })
  if (view === VIEW_RESULT) {
    return <ProductResults code={code} onGoToHistory={handleGoToHistory} onGoToScan={handleGoToScan} />
  } else if (view === VIEW_HISTORY) {
    return <ScanHistory onGoToResult={handleGoToResult} onGoToScan={handleGoToScan} />
  }
  return <Reader onScan={handleScan} onGoToHistory={handleGoToHistory} />
};

const styles = StyleSheet.create({
});

export default App;
