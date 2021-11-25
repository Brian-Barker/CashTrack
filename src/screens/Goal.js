import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Goal = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* <Text style={styles.goalHeader}>
                    Monthly Overview
                </Text> */}
        <Animated.View style={styles.goalInfoContainer}>
          <Animated.View style={styles.monthlyLimitContainer}>
            <Text style={styles.goalSubHeader}>Monthly Limit</Text>
            <Text style={styles.goalText}>$2000.00</Text>
          </Animated.View>

          <Animated.View style={styles.remainingBalanceContainer}>
            <Text style={styles.goalSubHeader}>Remaining Balance</Text>
            <Text style={styles.goalText}>$423.52</Text>
          </Animated.View>

          <Animated.View style={styles.totalSavingsContainer}>
            <Text style={styles.goalSubHeader}>Total CashTrack Savings</Text>
            <Text style={styles.goalText}>$63.17</Text>
          </Animated.View>

          <Animated.View style={styles.highestExpenseContainer}>
            <Text style={styles.goalSubHeader}>Highest Monthly Expense</Text>
            <Text style={styles.goalText}>Groceries</Text>
          </Animated.View>

          <Animated.View style={styles.rankContainer}>
            <Text style={styles.goalSubHeader}>Saver Rank</Text>
            <Text style={styles.goalText}>Broke</Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#002B19' //Highland
    //backgroundColor: '#d8ede6', //SpringMint
    backgroundColor: '#E5FAF3',
    //backgroundColor: 'white'
  },
  goalInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: hp('10%'),
  },
  goalHeader: {
    fontFamily: 'PierSans-Regular',
    textAlign: 'center',
    fontSize: 36,
    padding: 16,
    marginTop: 8,
    color: 'white',
    paddingBottom: 20,
  },
  goalSubHeader: {
    fontFamily: 'PierSans-Regular',
    textAlign: 'center',
    fontSize: hp('2.5%'),
    marginTop: hp('1%'),
    color: '#002B19',
  },
  goalText: {
    fontFamily: 'PierSans-Regular',
    textAlign: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
    // color: '#32CD32',
    fontSize: hp('3%'),
    color: '#407565',
    //backgroundColor:'#407565',
    borderRadius: hp('0.5%'),
    paddingTop: hp('1%'),
  },
  monthlyLimitContainer: {
    alignItems: 'center',
    height: hp('25%'),
    width: wp('45%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    paddingTop: hp('2.5%'),
    marginTop: hp('1.75%'),
    marginBottom: hp('1.75%'),
    marginLeft: hp('1.5%'),
  },
  remainingBalanceContainer: {
    alignItems: 'center',
    height: hp('25%%'),
    width: wp('45%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    paddingTop: hp('2.5%'),
    marginTop: hp('1.75%'),
    marginBottom: hp('1.75%'),
    marginLeft: hp('2%'),
  },
  totalSavingsContainer: {
    alignItems: 'center',
    height: hp('25%%'),
    width: wp('45%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    paddingTop: hp('2.5%'),
    marginTop: hp('1.75%'),
    marginBottom: hp('1.75%'),
    marginLeft: hp('1.5%'),
  },
  highestExpenseContainer: {
    alignItems: 'center',
    height: hp('25%%'),
    width: wp('45%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    paddingTop: hp('2.5%'),
    marginTop: hp('1.75%'),
    marginBottom: hp('1.75%'),
    marginLeft: hp('1.5%'),
  },
  rankContainer: {
    alignItems: 'center',
    height: hp('25%%'),
    width: wp('45%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: hp('1.5%'),
    paddingTop: hp('2.5%'),
    marginTop: hp('1.75%'),
    marginBottom: hp('1.75%'),
    marginLeft: hp('1.5%'),
  },
});
