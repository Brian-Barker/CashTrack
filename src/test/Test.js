import React, {useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import {
  PermissionsAndroid,
  TouchableOpacity,
  NativeModules,
  Dimensions,
  Modal,
  NativeEventEmitter,
} from 'react-native';
import {createUser, fetchPlaceData, loginUser} from '../apis/Backend';
import styles from '../styles';

const {height, width} = Dimensions.get('window');

const {GeolocationModule} = NativeModules;

const eventEmitter = new NativeEventEmitter();

const Test = () => {
  let [hasPermission, setHasPermission] = useState(false);
  let [modalVisible, setModalVisible] = useState(false);
  let [longitude, setLongitude] = useState(0);
  let [latitude, setLatitude] = useState(0);
  let [backendResponse, setBackendResponse] = useState([]);
  let [serviceStatus, setServiceStatus] = useState('Halted');

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
    eventEmitter.addListener('Location', event => console.log(event));
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#18191a',
      }}>
      <Modal animationType={'slide'} transparent={true} visible={modalVisible}>
        <Animated.View
          style={[
            styles.safeArea,
            {
              backgroundColor: '#333333',
              // margin: '10%',
              borderRadius: 10,
              marginHorizontal: width * 0.025,
              marginVertical: height * 0.05,
              justifyContent: 'space-evenly',
              // width: width * 0.9,
            },
          ]}>
          {backendResponse.slice(0, 5).map((item, index) => (
            <Animated.View key={index} style={{alignItems: 'center'}}>
              <Animated.Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.name}
              </Animated.Text>
              {item.opening_hours !== undefined && (
                <Animated.Text style={{color: 'white'}}>
                  Open: {item.opening_hours.open_now ? 'Yes' : 'No'}
                </Animated.Text>
              )}
              <Animated.Text style={{color: 'white'}}>
                {item.vicinity}
              </Animated.Text>
              <Animated.Text style={{color: 'white'}}>
                Category: {item.types[0]}
              </Animated.Text>
            </Animated.View>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: '#ff0045',
              height: height * 0.05,
              width: width * 0.15,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: height * 0.01,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Animated.Text style={{color: 'white'}}>Close</Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
      <Animated.Text
        style={{color: 'white', fontSize: 30, marginBottom: height * 0.1}}>
        Service Status: {serviceStatus}
      </Animated.Text>
      <TouchableOpacity
        onPress={async () => {
          GeolocationModule.startWorker();
          setServiceStatus('Running');
        }}
        style={{
          backgroundColor: '#333333',
          height: height * 0.125,
          width: width * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: height * 0.01,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: '#1ab2d2', fontSize: 20}}>
          Start Task
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // await BackgroundService.stop();
          GeolocationModule.checkQueue();
        }}
        style={{
          backgroundColor: '#333333',
          height: height * 0.125,
          width: width * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: height * 0.01,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: '#2dc521', fontSize: 20}}>
          Check Task
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // await BackgroundService.stop();
          GeolocationModule.clearQueue();
          setServiceStatus('Halted');
        }}
        style={{
          backgroundColor: '#333333',
          height: height * 0.125,
          width: width * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: height * 0.01,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: '#ef4e4e', fontSize: 20}}>
          Stop Task
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          let token = await loginUser('mdirocco', 'password');
          // await Geolocation.getCurrentPosition(
          //   async result => {
          //     setLongitude(result.coords.longitude);
          //     setLatitude(result.coords.latitude);
          //     console.log(result);
          //     let res = await fetchPlaceData(
          //       token.token,
          //       result.coords.latitude,
          //       result.coords.longitude,
          //     );
          //     console.log(res);
          //     setBackendResponse(res);
          //     setModalVisible(true);
          //   },
          //   error => {
          //     console.log(error);
          //   },
          //   {
          //     enableHighAccuracy: true,
          //     maximumAge: 0,
          //   },
          // );
        }}
        style={{
          backgroundColor: '#333333',
          height: height * 0.125,
          width: width * 0.5,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: height * 0.01,
          borderRadius: 10,
          elevation: 5,
        }}>
        <Animated.Text style={{color: '#e7932e', fontSize: 20}}>
          Test Backend
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Test;
