import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar, ActivityIndicator,SafeAreaView,ScrollView, FlatList, MaskedViewComponent} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from '../styles';
import Transaction from '../components/Transaction';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
const {height, width} = Dimensions.get('window');

let tempTransactions = [
  {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
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
    
    <View style={styles.homeContainer}>
      <ScrollView>   
        <Animated.Text style={styles.OverallInfoHeaderText}>
          Remaining Weekly Balance
        </Animated.Text>
        <Animated.Text style={styles.overallLeftOverBudgetGreen}>
          $225.00
        </Animated.Text>


        <Animated.Text style={styles.OverallInfoHeaderText}>
        Monthly Spending 
        </Animated.Text>
        <LineChart
          data={{
            labels: ["January","February","March","April"],
            datasets:[
              {
                data:[
                  900,650,340,180
                ]
              }
            ]
          }}
          width = {wp('85%')}
          height= {hp('30%')}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "66CC00",
            backgroundGradientTo: "#007704",
            backgroundGradientFrom: "#03A608",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              //borderRadius: hp('4%')
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "black"
            }
          }}
          //bezier
          style={{
            marginTop:('5%'),
            alignItems:'flex-start',
            borderRadius: hp('1%'),
            justifyContent:'center',
            alignSelf:'center'
          }}
        />

        <Animated.Text style={styles.RecentPurchsesHeaderText}>
          Recent Purchases
        </Animated.Text>

      
        <View stype={{marginBottom: 0}}>
        {tempTransactions.map((item, index) => (
          <Transaction key={index} item={item} delay={index} />
        ))}
        </View>
        

      </ScrollView>
    </View>
    
  );
};

export default Home;
