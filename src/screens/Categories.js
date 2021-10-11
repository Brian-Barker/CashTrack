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
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                }}
                style={{
                marginVertical: 8,
                borderRadius: 16,
                }}
                accessor="percentage"
                backgroundColor="transparent"
                paddingLeft="5"
                absolute //for the absolute number remove if you want percentage
            />
            
            <FlatGrid style={styles.gridView}
                itemDimension={80}
                data={['Groceries','Dining','Shopping','Transport','Travel','Health','Insurance','Education','Utilities','Finance','Fun-Money', ]}
                renderItem={({ item }) => (
                
                <TouchableOpacity>
                    <Text 
                        style={{
                            fontSize: 15,
                            backgroundColor: '#03A608', 
                            textAlign: 'center',
                            color: 'white',
                            height: 85,
                            width: 85,
                            borderRadius: 10,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 35,
                        }}
                        //onPress={() => alert(item + ' Clicked!')}
                        
                        onPress={() => navigation.navigate('transactions'+item)}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
                
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
        fontSize: 28,
        padding: 16,
        marginTop: 16,
        color: 'white',
    },
    pieChartHeader: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 0,
        color: 'white',
    },
})
