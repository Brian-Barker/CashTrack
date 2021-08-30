import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles';
import Transaction from '../components/Transaction';

const {height, width} = Dimensions.get('window');

let tempTransactions = [
  {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
];

const Home = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [sunday, setSunday] = useState(new Date());

  const translateY = useSharedValue(-500);
  const slide = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 2000});
  });

  useEffect(() => {
    console.log('Simulating fetch request...');
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={styles.safeArea}>
        <StatusBar
          translucent={false}
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <Animated.View style={styles.loadingScreenContainer}>
          <Animated.Text style={styles.loadingText}>Ca$hTrac</Animated.Text>
          <ActivityIndicator size={'large'} color={'#4f08aa'} />
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={styles.homeContainer}>
      <StatusBar backgroundColor="#4f08aa" barStyle={'light-content'} />
      <Animated.View style={[slide, styles.homeSummaryView]}>
        <Animated.View style={styles.homeSummaryHeaderPhotoView}>
          <Animated.Text style={styles.homeSummaryHeaderText}>
            Dashboard
          </Animated.Text>
          <Animated.View style={styles.homeSummaryPhotoView}>
            <ActivityIndicator size={'large'} color={'#4f08aa'} />
          </Animated.View>
        </Animated.View>
        <Animated.View>
          <Animated.View style={styles.homeSummaryAllowanceView}>
            <Animated.Text style={styles.homeSummaryAllowanceText}>
              My Weekly Allowance
            </Animated.Text>
            <Animated.Text style={styles.homeSummaryAllowanceTextBold}>
              $250.00
            </Animated.Text>
          </Animated.View>
          <Animated.Text style={styles.homeSummaryAllowanceTextSmall}>
            {sunday.toDateString()}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={styles.homeSummaryAllowanceView}>
          <Animated.Text style={styles.homeSummaryAllowanceText}>
            Allowance Remaining
          </Animated.Text>
          <Animated.Text style={styles.homeSummaryAllowanceTextBold}>
            $41.74
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={styles.homeTransactionView}>
        <Animated.Text style={styles.homeTransactionViewHeader}>
          Purchases This Week
        </Animated.Text>
        <Animated.View>
          {tempTransactions.map((item, index) => (
            <Transaction key={index} item={item} delay={index} />
          ))}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Home;
