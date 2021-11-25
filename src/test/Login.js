import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import styles from '../styles';
import {Dimensions, StatusBar, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchUserToken, loginUser} from '../apis/Backend';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const logoSpinnerRotation = useSharedValue(0);
  const logoPositionX = useSharedValue(0);
  const logoPositionY = useSharedValue(0);
  const logoCenterHeight = useSharedValue(0);
  const logoCenterWidth = useSharedValue(0);
  const logoSpinnerHeight = useSharedValue(0);
  const logoSpinnerWidth = useSharedValue(0);
  const loginDivOpacity = useSharedValue(0);

  const shiftTheFuckingRegisterView = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateX: height * 0.1},
        {translateY: height * 0.2},
      ],
    };
  });

  const logoPositionAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: logoPositionX.value},
        {translateY: logoPositionY.value},
      ],
    };
  });

  const logoCenterAnimation = useAnimatedStyle(() => {
    return {
      height: logoCenterHeight.value,
      width: logoCenterWidth.value,
    };
  });

  const logoSpinnerRotationAnimation = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: logoSpinnerRotation.value + ' deg'}],
      height: logoSpinnerHeight.value,
      width: logoSpinnerWidth.value,
    };
  });

  const loginDivOpacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: loginDivOpacity.value,
    };
  });

  useEffect(() => {
    const checkLogin = async () => {
      let res = await fetchUserToken();
      if (res !== null) {
        navigation.navigate('Tabs');
      }
    };

    checkLogin().done();

    // Logo height and width

    logoSpinnerHeight.value = withTiming(height * 0.2, {duration: 1000});
    logoSpinnerWidth.value = withTiming(height * 0.2, {duration: 1000});
    logoCenterHeight.value = withTiming(height * 0.125, {duration: 1000});
    logoCenterWidth.value = withTiming(height * 0.125, {duration: 1000});

    // Logo spinner rotation

    logoSpinnerRotation.value = withDelay(
      2000,
      withRepeat(withTiming(360, {duration: 25000, easing: Easing.linear}), -1),
    );

    // Logo translation

    logoPositionY.value = withDelay(
      1000,
      withTiming(-height * 0.3, {duration: 1000}),
    );

    // Login div opacity

    loginDivOpacity.value = withDelay(2000, withTiming(1, {duration: 500}));
  });

  return (
    <Animated.View style={[styles.safeArea, {backgroundColor: '#407565'}]}>
      <StatusBar backgroundColor={'#407565'} />
      <Animated.View
        style={[
          logoPositionAnimation,
          styles.safeArea,
          {position: 'absolute'},
        ]}>
        <Animated.Image
          source={require('../../assets/spinner_transparent_recolor.png')}
          style={[
            logoSpinnerRotationAnimation,
            {height: height * 0.2, width: height * 0.2, position: 'absolute'},
          ]}
        />
        <Animated.Image
          source={require('../../assets/1024_transparent_recolor.png')}
          style={[
            logoCenterAnimation,
            {
              height: height * 0.125,
              width: height * 0.125,
              position: 'absolute',
            },
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          loginDivOpacityAnimation,
          {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#407565',
            // elevation: 5,
            marginTop: 50,
            height: height * 0.5,
            width: width * 0.8,
            borderRadius: 10,
            translateY: height * 0.03,
          },
        ]}>
        <TextInput
          onChangeText={text => setUsername(text)}
          style={{
            height: height * 0.07,
            width: width * 0.7,
            margin: 6,
            // borderWidth: 1,
            borderRadius: 15,
            borderColor: 'white',
            paddingHorizontal: 20,
            color: '#002b19',
            fontSize: 16,
            backgroundColor: 'white',
          }}
          placeholder={'Your Username'}
          placeholderTextColor="#BBBBBB"
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          style={{
            height: height * 0.07,
            width: width * 0.7,
            margin: 6,
            // borderWidth: 1,
            borderRadius: 15,
            borderColor: 'white',
            paddingHorizontal: 20,
            color: '#002b19',
            fontSize: 16,
            backgroundColor: 'white',
          }}
          placeholder={'Your Password'}
          placeholderTextColor="#BBBBBB"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={async () => {
            let res = await loginUser(username, password);
            if (res.token !== undefined) {
              navigation.navigate('Tabs');
            }
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.07,
            width: width * 0.7,
            marginTop: 24,
            marginBottom: 6,
            borderRadius: 15,
            backgroundColor: '#002b19',
          }}>
          <Animated.Text style={{color: 'white', fontSize: 20}}>
            Login
          </Animated.Text>
        </TouchableOpacity>
        <Animated.Text style={{marginTop: height * 0.01, color: '#e5faf3'}}>
          Forgot Password?
        </Animated.Text>
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            translateY: height * 0.2,
          }}
        />
        <Animated.View
          style={[
            shiftTheFuckingRegisterView,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Animated.Text style={{color: 'black'}}>
            Don't have an account?
          </Animated.Text>
          <TouchableOpacity
            style={{zIndex: 1}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Animated.Text style={{marginTop: height * 0.01, color: '#e5faf3'}}>
              Register Now!
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Login;
