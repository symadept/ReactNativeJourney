/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import MainScreen from './Containers/MainScreen';
import DetailedScreen from './Containers/DetailedScreen';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="mainScreen"
          component={MainScreen}
          title="Main Screen"
          initial
        />
        <Scene
          key="detailedScreen"
          component={DetailedScreen}
          title="Detailed Screen"
        />
      </Scene>
    </Router>
    );
  }
}
