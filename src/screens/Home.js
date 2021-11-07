import React, {useEffect, useState} from 'react';
import {View, Dimensions, StatusBar, ActivityIndicator,SafeAreaView,ScrollView, FlatList, MaskedViewComponent, ImageBackground} from 'react-native';
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
//import { LinearGradient } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';
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
    <View style={styles.homeContainer}>

      {/* <ImageBackground source={require('../../assets/icons/Background,5.png')} style={{width: '110%', height: '110%'}}> */}

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
              labels: ["Week 1"," Week 2","Week 3","Week 4"],
              datasets:[
                {
                  data:[
                    900,650,340,180
                  ]
                }
              ]
            }}
            width = {wp('80%')}
            height= {hp('25%')}
            yAxisLabel="$"
            yAxisSuffix=""
            withVerticalLines={false}
            withHorizontalLines={false}
            withShadow={false}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "white",
              backgroundGradientTo: "white",
              backgroundGradientFrom: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `#002B19`,
              labelColor: (opacity = 1) => `#002B19`,
              style: {
                //borderRadius: hp('4%')
              },
              propsForDots: {
                r: "6",
                strokeWidth: "4",
                stroke: "white"
              },
              withVerticalLines :"False"
            }}
            //bezier
            style={{
              marginTop:('2%'),
              alignItems:'flex-start',
              borderRadius: hp('1%'),
              justifyContent:'center',
              alignSelf:'center'
            }}
          />
        </Animated.View>
        </Animated.View>
        </Animated.View>

        <Animated.View style={styles.recentPurchasesContainer}>
          <Animated.Text style={styles.RecentPurchsesHeaderText}>
            Recent Purchases
          </Animated.Text>
        
          <View stype={{marginBottom: 0}}>
          {tempTransactions.map((item, index) => (
            <Transaction key={index} item={item} delay={index} />
          ))}
          </View>
        </Animated.View>


      </ScrollView>
{/*       
      </ImageBackground> */}

    </View>
    
  );
};

export default Home;
