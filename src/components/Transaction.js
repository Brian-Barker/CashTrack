import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles';

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
      <Animated.View
        style={[styles.homeSummaryPhotoView, {backgroundColor: 'green'}]}
      />
      <Animated.View>
        <Animated.Text>{props.item.name}</Animated.Text>
        <Animated.Text style={{color: 'gray'}}>
          {props.item.category}
        </Animated.Text>
      </Animated.View>
      <Animated.View>
        <Animated.Text style={{color: 'red', fontSize: 20}}>
          -${props.item.amount}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Transaction;