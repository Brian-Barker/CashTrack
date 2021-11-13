import React, {useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {
  PermissionsAndroid,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const {GeolocationModule} = NativeModules;

BackgroundService.on('expiration', () => {
  console.log('Rip me!');
});

const options = {
  taskName: 'CashTrack',
  taskTitle: 'Location Service',
  taskDesc: "We're always watching...",
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#00ad13',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

const Test = () => {
  let [hasPermission, setHasPermission] = useState(false);
  let [longitude, setLongitude] = useState(0);
  let [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const fetchPermissions = async () => {
      const rationale = {
        title: 'CashTrack Geolocation Tracking Permission',
        message:
          'CashTrack would like to keep track of the stores you visit in order to help you budget more efficiently.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      };
      try {
        const coarse = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          rationale,
        );
        const fine = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          rationale,
        );
        const background = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          rationale,
        );
        if (
          coarse === 'granted' &&
          fine === 'granted' &&
          background === 'granted'
        ) {
          console.log('We in the money');
          setHasPermission(true);
        } else {
          console.log(coarse, fine, background);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    if (!hasPermission) {
      fetchPermissions().done();
    }
  });

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        Geolocation.getCurrentPosition(
          position => {
            BackgroundService.updateNotification({
              taskDesc:
                'Longitude: ' +
                position.coords.longitude +
                '\nLatitude: ' +
                position.coords.latitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
        );
        await sleep(10000);
      }
    });
  };

  return (
    <Animated.View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={async () => {
          // if (hasPermission) {
          //   Geolocation.getCurrentPosition(
          //     position => {
          //       console.log(position);
          //       setLongitude(position.coords.longitude);
          //       setLatitude(position.coords.latitude);
          //     },
          //     error => {
          //       console.log(error.code, error.message);
          //     },
          //     {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
          //   );
          // }
          // await BackgroundService.start(veryIntensiveTask, options);
          GeolocationModule.startWorker();
        }}
        style={{
          backgroundColor: '#1ab2d2',
          padding: '10%',
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: 'white', fontSize: 20}}>
          Start Task
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // await BackgroundService.stop();
          GeolocationModule.checkQueue();
        }}
        style={{
          marginTop: 10,
          backgroundColor: '#2dc521',
          padding: '10%',
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: 'white', fontSize: 20}}>
          Check Task
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // await BackgroundService.stop();
          GeolocationModule.clearQueue();
        }}
        style={{
          marginTop: 10,
          backgroundColor: '#ef4e4e',
          padding: '10%',
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: 'white', fontSize: 20}}>
          Stop Task
        </Animated.Text>
      </TouchableOpacity>
      <Animated.View style={{marginTop: 50}}>
        <Animated.Text>Longitude: {longitude}</Animated.Text>
        <Animated.Text>Latitude: {latitude}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Test;
