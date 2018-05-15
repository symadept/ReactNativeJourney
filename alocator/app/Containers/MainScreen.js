import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';

export default class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}
        // onPress={() => Actions.detailedScreen()}
        onPress={() => this.onOpenAutocompletePress()}
        >
          Main Screen mock
        </Text>
      </View>
    );
  }

  onOpenAutocompletePress = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		  console.log(place);
      Actions.detailedScreen({places:JSON.stringify(place)});
    })
    .catch(error => console.log(error.message));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
