import React, {useEffect} from 'react';
import styles from '../styles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const LoadingIndicator = () => {
  const logoSpinnerRotation = useSharedValue(0);
  const logoCenterHeight = useSharedValue(0);
  const logoCenterWidth = useSharedValue(0);
  const logoSpinnerHeight = useSharedValue(0);
  const logoSpinnerWidth = useSharedValue(0);

  const logoSpinnerRotationAnimation = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: logoSpinnerRotation.value + ' deg'}],
      height: logoSpinnerHeight.value,
      width: logoSpinnerWidth.value,
    };
  });

  const logoCenterAnimation = useAnimatedStyle(() => {
    return {
      height: logoCenterHeight.value,
      width: logoCenterWidth.value,
    };
  });

  useEffect(() => {
    logoSpinnerHeight.value = withTiming(height * 0.15, {duration: 100});
    logoSpinnerWidth.value = withTiming(height * 0.15, {duration: 100});
    logoCenterHeight.value = withTiming(height * 0.1, {duration: 100});
    logoCenterWidth.value = withTiming(height * 0.1, {duration: 100});

    logoSpinnerRotation.value = withRepeat(
      withTiming(360, {duration: 1000, easing: Easing.linear}),
      -1,
    );
  });

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Image
        source={require('../../assets/spinner_transparent_recolor.png')}
        style={[
          logoSpinnerRotationAnimation,
          {height: height * 0.2, width: height * 0.2, position: 'absolute'},
        ]}
      />
      <Animated.Image
        source={require('../../assets/1024_transparent_recolor_full.png')}
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
  );
};

export default LoadingIndicator;
