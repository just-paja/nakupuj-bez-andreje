import React from 'react';

import {View, StyleSheet} from 'react-native';
import {ReaderMenu} from './ReaderMenu';
import {RNCamera} from 'react-native-camera';

export function Reader ({ onScan, onGoToHistory })  {
  return (
    <View style={styles.root}>
      <ReaderMenu onGoToHistory={onGoToHistory} />
      <RNCamera 
        captureAudio={false}
        onBarCodeRead={onScan}
        style={styles.camera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
});


