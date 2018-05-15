import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Animated, Easing, Dimensions, DeviceEventEmitter} from 'react-native';
const ReactNativeHeading = require('react-native-heading');
import AnimatedBar from './AnimatedBar.js';

const DELAY = 100;
const window = Dimensions.get('window');
const degree_update_rate = 1; // Number of degrees changed before the callback is triggered

global.display = 20

export default class DetailedScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Props: ' + this.props.places);
    this.spinValue = new Animated.Value(0);
    this.state =  {
        location: null,
        errorMessage: null,
        heading: null,
        truenoth: null,
        targetDirection: 0,
        targetLocation: [32.8771177, -96.9531744 ],
        data: [],
      };
  }



  componentWillMount() {
    //this._getLocationAsync();
    //this._getHeadingAsync();
    this.getTargetLocationDirection();
  }

  componentDidMount(){
    this.generateData();
    this.interval = setInterval(() => {
      this.generateData();
    }, 1000);

    ReactNativeHeading.start(1)
	.then(didStart => {
		this.setState({
			headingIsSupported: didStart,
		})
	})

  DeviceEventEmitter.addListener('headingUpdated', data => {
    	console.log('New heading is:', data.heading);
      this.setState({heading: data.heading})
    });
  }


  componentWillUpdate() {
    this.spin()
  }

  componentWillUnmount(){
    ReactNativeHeading.stop();
  	DeviceEventEmitter.removeAllListeners('headingUpdated');
  }
  generateData = () => {
    yellow = "#fff00"
    red = "#ff0000"
    green = "#00ff00"
    color = red
      const data = [];
      for (let i = 0; i < 1; i++) {
        temp = 0;
        if(global.display < 180) {temp = global.display/180;}
      else if (global.display > 180) { temp = Math.abs(global.display-380)/180;}
        else {temp = 1;}
        data.push(Math.floor(temp * window.width));
      }

      this.setState({
        data,
      });
    }

  _getHeadingAsync = async () => {
  };

  getTargetLocationDirection(){

      let targetLocation = this.props.places;
      let currentLocation = this.props.currentLocation;
      lat1 = this.state.location.coords.latitude;
      lng1 = this.state.location.coords.longitude;
      lat2 = targetLocation.latitude;
      lng2 = targetLocation.longitude;
      PI = Math.PI;
    dTeta = Math.log(Math.tan((lat2/2)+(PI/4))/Math.tan((lat1/2)+(PI/4)));
    dLon = Math.abs(lng1-lng2);
    teta = Math.atan2(dLon,dTeta);
    direction = teta * (180/ Math.PI);;
      this.setState({targetDirection:direction});
      console.log("res: " + direction);

  };

  spin() {
    let start = JSON.stringify(this.spinValue);
    let heading =  Math.round(this.state.heading);

    let rot  = +start;
    let rotM = rot % 360;

    if(rotM < 180 && (heading > (rotM + 180)))
      rot -= 360;
    if(rotM >= 180 && (heading <= (rotM - 180)))
      rot += 360

    rot += (heading - rotM)


    Animated.timing(
      this.spinValue,
      {
        toValue: rot,
        duration: 300,
        easing: Easing.easeInOut
      }
    ).start()
  }

  calculateTarget(){

  }

  render() {
    let LoadingText = 'Loading...';
    let display = LoadingText;

    if (this.state.errorMessage)
      display = this.state.errorMessage;

    const spin = this.spinValue.interpolate({
      inputRange: [0,360],
      outputRange: ['-0deg', '-360deg']
    })

    display = Math.round(JSON.stringify(this.spinValue))

    if(display < 0)
      display += 360
    if(display > 360)
      display -= 360
      global.display = display

    return (

      <View style={styles.container}>
        <Text style={styles.text}>{display+'°'}</Text>
        <View style={styles.arrowContainer} >
          <Image resizeMode='contain' source={require('../assets/valid_copy.png')} style={styles.arrow} />
        </View>
        <View style={styles.imageContainer} >
          <Animated.Image resizeMode='contain' source={require('../assets/pointer.png')}
            style={{
            width:  deviceWidth  - 10, height: deviceHeight/2 - 10,
            left: deviceWidth /2 -  (deviceWidth   - 10)/2, top:  deviceHeight /2 - (deviceHeight/2  - 10)/2,
            transform: [{rotate: spin}],
          }} />
        </View>

      </View>
    );
  }
}

// Device dimensions so we can properly center the images set to 'position: absolute'
const deviceWidth  =  Dimensions.get('window').width
const deviceHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#263544',
    fontSize: 80,
    transform: ([{translateY: -(deviceHeight/2 - (deviceHeight/2  - 10)/2) - 50 }])
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrowContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    width:  deviceWidth  - 10, height: deviceHeight/2 - 10,
    left: deviceWidth /2 -  (deviceWidth   - 10)/2, top:  deviceHeight /2 - (deviceHeight/2  - 10)/2,

  }
});
