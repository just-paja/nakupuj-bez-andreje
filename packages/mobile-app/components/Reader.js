import React from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

export function Reader ({ onCode })  {
  return (
    <RNCamera 
      captureAudio={false}
      onBarCodeRead={onCode}
      style={styles.camera}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  }
});


