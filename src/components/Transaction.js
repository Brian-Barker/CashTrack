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
      <Animated.View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        
        <Image
            source={require('../../assets/icons/Groceries.png')}
            resizeMode = 'contain' 
            style={{
                width: wp('12%'),
                height: hp('5.5%'),
                backgroundColor: 'transparent',
                // alignSelf:'center',
                marginLeft: wp('3%'),
                tintColor: '#002B19',
            }}
        />

        <Animated.View>
          <Animated.Text style={{color: '#002B19', paddingLeft: wp('3%')}}>
            {props.item.name}
          </Animated.Text>
          <Animated.Text style={{color: '#002B19', paddingLeft: wp('3%')}}>
            {props.item.category}
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={{justifyContent: 'space-between'}}>
        <Animated.Text style={{color: '#407565', fontSize: hp('3%'), paddingRight: wp('4%')}}>
          -${props.item.amount}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Transaction;
