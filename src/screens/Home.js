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
//import { LinearGradient } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
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
    // <View style={styles.homeContainer}>
    <>
    {/* <LinearGradient colors={['#e9e9e9','#f6f6f6']} style={{flex:1,backgroundColor:'white'}}> */}
      {/* <ScrollView> */}



       


        <Animated.View style={{flex:1,flexDirection:'column',justifyContent:'space-evenly'}}>
        <Animated.View style={{height:hp('8%'),width:wp('100%'),backgroundColor:'white',borderBottomColor:'black',borderBottomWidth:0.5}}>
        <Animated.Text style={styles.CurrentTab}>
        Home
        </Animated.Text>
        </Animated.View>


        <Animated.View style={{flex:1}}>
        <Animated.View style={{alignSelf:'center', alignItems:'center', height:hp('35%'),width:wp('85%'),backgroundColor:'white',borderRadius:hp('2.5%'),marginTop:hp('1%')}}>
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
            color: (opacity = 1) => `black`,
            labelColor: (opacity = 1) => `black`,
            style: {
              //borderRadius: hp('4%')
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "black"
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

        <Animated.View style = {{alignItems:'center', height:hp('10%'),width:wp('85%'),backgroundColor:'white',justifyContent:'center',alignSelf:'center',marginTop:hp('1%'),borderRadius:hp('2.5%')}}>

        <Animated.Text style={styles.OverallInfoHeaderText}>
          Remaining Weekly Balance
        </Animated.Text>
        <Animated.Text style={styles.overallLeftOverBudgetGreen}>
          $225.00
        </Animated.Text>

        </Animated.View>


        <Animated.View style = {{height:hp('40%'),width: wp('85%'),backgroundColor:'white',alignSelf:'center',marginTop:hp('1%'),borderTopLeftRadius:hp('2.5%'),borderTopRightRadius:hp('2.5%')}}>
        <Animated.Text style={styles.RecentPurchsesHeaderText}>
          Recent Purchases
        </Animated.Text>

      
        <View style={{marginBottom: 0}}>
        {tempTransactions.map((item, index) => (
          <Transaction key={index} item={item} delay={index} />
        ))}
        </View>
        </Animated.View>
        </Animated.View>
        </Animated.View>
      {/* </ScrollView> */}
      {/* </LinearGradient> */}
    </>
  );
};

export default Home;
