import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}
        // onPress={() => Actions.detailedScreen()}
        onPress={() => this.onOpenAutocompletePress()}
        >
          Click here to check your 5G Eligbility!
        </Text>
      </View>
    );
  }

  onOpenAutocompletePress = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		  console.log(place);
      this.searchStreetLocationFor('Byron Drive', place.latitude, place.longitude, 0.5, place.addressComponents.locality);
      // Actions.detailedScreen({places:JSON.stringify(place)});
    })
    .catch(error => console.log(error.message));
  }

  searchStreetLocationFor = (query, lat, long, radius, locality) => {
    console.log(query, lat, long, radius);
    RNGooglePlaces.getAutocompletePredictions(query, {
      latitude: lat,
      longitude: long,
      radius: radius
    })
    .then((places) => {
      this.findRightStreet(query, locality, places);
    })
    .catch(error =>
      console.log('Exception: ' + error.message)
    );
  }

  findRightStreet = (streetName, locality, places) => {
    // for(var item in places) {
    for(var index=0; index < places.length; index++) {
      var item = places[index];
      if(item.secondaryText.indexOf(locality) != -1 && item.primaryText == streetName) {
        console.log('Street Place: ' + JSON.stringify(item));
        this.getGPlaceById(item.placeID);
        // Actions.detailedScreen({places:JSON.stringify(item)});
        return;
      }
    }
  }

  getGPlaceById = (placeId) => {
    RNGooglePlaces.lookUpPlaceByID(placeId)
    .then((results) =>
    {
      console.log(results);
      Actions.detailedScreen({places:JSON.stringify(results), currentPlace:this.getCurrentPlace()});
    })
    .catch((error) => console.log(error.message));
  }

  getCurrentPlace = () => {
    RNGooglePlaces.getCurrentPlace()
    .then((results) => {
      console.log(results);
      return results;
    })
    .catch((error) => console.log(error.message));
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
