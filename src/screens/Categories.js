import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {FlatGrid} from 'react-native-super-grid';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated from "react-native-reanimated";

const Categories = ({navigation}) => {
    
    return (

        <View style={styles.container}>
            
            {/* <Animated.View style={styles.homeCategoryTextContainer}>
                <Text style={styles.homeCategoryTextHeader}>
                    Purchases By Category
                </Text>
            </Animated.View> */}

            <Animated.View style={styles.pieChartContainer}>
                <Text style={styles.pieChartHeader}>
                    Expense Breakdown
                </Text>
            
                <PieChart
                    data={[
                    {
                        name: 'Groceries',
                        percentage: 21,
                        color: '#7BBCA9',
                        legendFontColor: 'white',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Utilities',
                        percentage: 28,
                        color: '#A1E2CF',
                        legendFontColor: 'white',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Shopping',
                        percentage: 8,
                        color: '#2E6F5C',
                        legendFontColor: 'white',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Dining',
                        percentage: 11,
                        color: '#559683',
                        legendFontColor: 'white',
                        legendFontSize: 15,
                    },
                    ]}
                    width={wp('85%')}
                    height={hp('25%')}
                    chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: hp('1%'),
                    },
                    }}
                    style={{
                    marginVertical: hp('0.5%'),
                    borderRadius: hp('2%'),
                    }}
                    accessor="percentage"
                    backgroundColor="transparent"
                    paddingLeft="8"
                    absolute //for the absolute number remove if you want percentage
                />
            </Animated.View>
            
            <Animated.View style={styles.categoryContainer}>
                <FlatGrid style={{width:wp('100%')}}
                    itemDimension={150}
                    style={{flex:1}}
                    data={['Groceries','Dining','Shopping','Transport','Travel','Health','Insurance','Education','Utilities','Finance','Fun-Money']}
                    renderItem={({ item }) => (
                    <View style={{justifyContent:'center',alignItems:'center'}}>

                        <TouchableOpacity style={{height:hp('5%'),width:wp('35%'),flex:1,justifyContent:'center', backgroundColor: '#407565',borderRadius: hp('1.5'),alignItems:'center', borderBottomWidth: 1.5, borderColor:'white'}}>
                            <Text 
                                style={{
                                    fontFamily: 'PierSans-Regular',
                                    fontSize: hp('2.5%'),
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                                //onPress={() => alert(item + ' Clicked!')}
                                
                                onPress={() => navigation.navigate('transactions'+item)}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </Animated.View>
           
        </View>


    )
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#002B19', //Highland
        //backgroundColor: '#b2decf', //SurfnTurf
        //backgroundColor: '#c0e0d5' //RobinsNest
        backgroundColor: '#d8ede6', //SpringMint
        //backgroundColor: 'white'
    },
    homeCategoryTextContainer: {
        textAlign: 'center',
        height:hp('7'),
        width:wp('85%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
        borderRadius:hp('1.5%'),
        backgroundColor:'transparent',
    },
    homeCategoryTextHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('4%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    pieChartContainer: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3'),
        height:hp('30'),
        width:wp('85%'),
        marginTop:hp('5.75%'),
        marginBottom:hp('2.75%'),
        borderRadius:hp('1.5%'),
        color: 'white',
        backgroundColor:'#407565',
    },
    pieChartHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3'),
        marginTop: hp('1%'),
        borderRadius:hp('1.5%'),
        color: 'white',
        backgroundColor:'#407565',
    },
    categoryContainer: {
        alignItems:'center',
        height:hp('40'),
        width:wp('85%'),
        backgroundColor:'#407565',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
})
