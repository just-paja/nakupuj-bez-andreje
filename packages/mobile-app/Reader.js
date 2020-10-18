import React from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

export function Reader ({ onCode })  {
  return (
    <RNCamera 
      style={styles.camera}
      onBarCodeRead={onCode}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  }
});


