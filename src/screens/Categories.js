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
            
            <PieChart
                data={[
                {
                    name: 'Groceries',
                    percentage: 21,
                    color: '#00FF11',
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
                    color: '#0C7813',
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
            
            <FlatGrid style={{width:wp('100%')}}
                itemDimension={150}
                style={{flex:1}}
                data={['Groceries','Dining','Shopping','Transport','Travel','Health','Insurance','Education','Utilities','Finance','Fun-Money']}
                renderItem={({ item }) => (
                <View style={{justifyContent:'center',alignItems:'center'}}>

                <TouchableOpacity style={{height:hp('5%'),width:wp('30%'),flex:1,justifyContent:'center', backgroundColor: '#03A608',borderRadius: hp('2%'),alignItems:'center'}}>
                    <Text 
                        style={{
                            fontSize: hp('3%'),
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
        backgroundColor: 'black'
    },
    homeCategoryViewHeader: {
        textAlign: 'center',
        fontSize: hp('4%'),
        padding: hp('1%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    pieChartHeader: {
        textAlign: 'center',
        fontSize: hp('3'),
        padding: hp('2%'),
        marginTop: hp('1%'),
        color: 'white',
    },
})
