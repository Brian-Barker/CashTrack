import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  MaskedViewComponent,
  ImageBackground,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from '../styles';
import Transaction from '../components/Transaction';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
//import { LinearGradient } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
const {height, width} = Dimensions.get('window');

//Pull from Database
import {tempTransactions} from '../components/Purchases';
import LoadingIndicator from '../components/LoadingIndicator';

const {GeolocationModule} = NativeModules;

const Home = () => {
  const numOfTransactions = tempTransactions.length;

  //Pull from Database
  const budgetAmount = 900;

  let [isLoading, setIsLoading] = useState(true);
  let [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    GeolocationModule.startWorker();
  }, []);

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
          setIsLoading(false);
        } else {
          console.log(coarse, fine, background);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    if (!hasPermission) {
      fetchPermissions().done();
    } else {
      setIsLoading(false);
    }
    console.log('Simulating fetch request...');
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
          <LoadingIndicator />
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <Animated.View style={styles.dashboardContainer}>
          <Animated.View style={styles.remainingBalanceContainer}>
            <Animated.Text style={styles.RemainingBalanceHeaderText}>
              Remaining Balance
            </Animated.Text>

            <Animated.Text style={styles.overallLeftOverBudgetGreen}>
              $225.00
            </Animated.Text>

            <Animated.View style={styles.monthlySpendingContainer}>
              <Animated.Text style={styles.OverallInfoHeaderText}>
                Weekly Spending
              </Animated.Text>

              <LineChart
                data={{
                  labels: ['Week 1', ' Week 2', 'Week 3', 'Week 4'],
                  datasets: [
                    {
                      // data: [900, 650, 340, 180],
                      data: [
                        budgetAmount,
                        (budgetAmount * 4) / 5,
                        budgetAmount / 2,
                        (budgetAmount * 3) / 9,
                      ],
                    },
                  ],
                }}
                width={wp('80%')}
                height={hp('25%')}
                yAxisLabel="$"
                yAxisSuffix=""
                withVerticalLines={false}
                withHorizontalLines={false}
                withShadow={false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientTo: 'white',
                  backgroundGradientFrom: 'white',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => '#002B19',
                  labelColor: (opacity = 1) => '#002B19',
                  style: {
                    //borderRadius: hp('4%')
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '4',
                    stroke: 'white',
                  },
                  withVerticalLines: 'False',
                }}
                //bezier
                style={{
                  marginTop: '2%',
                  alignItems: 'flex-start',
                  borderRadius: hp('1%'),
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <Animated.View style={styles.recentPurchasesContainer}>
          <Animated.Text style={styles.RecentPurchsesHeaderText}>
            Recent Purchases
          </Animated.Text>

          <View style={{marginBottom: 0}}>
            {tempTransactions
              .slice(numOfTransactions - 3, numOfTransactions)
              .map((item, index) => (
                <Transaction key={index} item={item} delay={index} />
              ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Home;
