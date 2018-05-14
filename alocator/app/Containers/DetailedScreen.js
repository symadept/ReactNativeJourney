import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const DetailedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Detailed Screen Mocked
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777777',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default DetailedScreen;
