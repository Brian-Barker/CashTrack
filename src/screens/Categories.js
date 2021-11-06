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

const Categories = ({navigation}) => {
    
    return (

        <View style={styles.container}>
            <Text style={styles.homeCategoryViewHeader}>
                Purchases By Category
            </Text>


            <Text style={styles.pieChartHeader}>
                Expense Breakdown
            </Text>
            
            <View>
            <PieChart
                data={[
                {
                    name: 'Groceries',
                    percentage: 21,
                    color: '#6eaf9c',
                    legendFontColor: 'white',
                    legendFontSize: 15,
                },
                {
                    name: 'Utilities',
                    percentage: 28,
                    color: 'silver',
                    legendFontColor: 'white',
                    legendFontSize: 15,
                },
                {
                    name: 'Shopping',
                    percentage: 8,
                    color: 'gray',
                    legendFontColor: 'white',
                    legendFontSize: 15,
                },
                {
                    name: 'Dining',
                    percentage: 11,
                    color: '#488472',
                    legendFontColor: 'white',
                    legendFontSize: 15,
                },
                ]}
                width={wp('80%')}
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
                paddingLeft="5"
                absolute //for the absolute number remove if you want percentage
            />
            </View>
            
            <FlatGrid style={{width:wp('100%')}}
                itemDimension={150}
                style={{flex:1}}
                data={['Groceries','Dining','Shopping','Transport','Travel','Health','Insurance','Education','Utilities','Finance','Fun-Money']}
                renderItem={({ item }) => (
                <View style={{justifyContent:'center',alignItems:'center'}}>

                <TouchableOpacity style={{height:hp('5%'),width:wp('35%'),flex:1,justifyContent:'center', backgroundColor: '#407565',borderRadius: hp('1%'),alignItems:'center'}}>
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
           
        </View>


    )
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#002B19'
    },
    homeCategoryViewHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('4%'),
        padding: hp('1%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    pieChartHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3'),
        padding: hp('2%'),
        marginTop: hp('1%'),
        color: 'white',
    },
})
