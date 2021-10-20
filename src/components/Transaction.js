import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Transaction = props => {
  const opacity = useSharedValue(0);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    console.log(props);
    opacity.value = withDelay(
      props.delay * 250,
      withTiming(1, {duration: 500}),
    );
  }, []);

  return (
    <Animated.View style={[opacityStyle, styles.transactionContainer]}>
      {/* <Animated.View
        style={[styles.homeSummaryPhotoView, {backgroundColor: 'green'}]}
      /> */}
      <Image
          source={require('../../assets/icons/Groceries.png')}
          resizeMode = 'contain' 
          style={{
              width: wp('15%'),
              height: hp('6%'),
              backgroundColor: 'transparent',
              alignSelf:'center'
          }}
      />
      <Animated.View>
        <Animated.Text style={{color: 'white', paddingLeft: wp('2%')}}>
          {props.item.name}
        </Animated.Text>
        <Animated.Text style={{color: 'gray', paddingLeft: wp('2%')}}>
          {props.item.category}
        </Animated.Text>
      </Animated.View>
      <Animated.View>
        <Animated.Text style={{color: 'red', fontSize: hp('3%'), paddingLeft: wp('5%')}}>
          -${props.item.amount}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Transaction;
