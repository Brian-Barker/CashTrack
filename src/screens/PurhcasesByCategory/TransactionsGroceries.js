import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Transaction from '../../components/Transaction';

let tempTransactions = [
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.53'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  ];


const transactionsGroceries = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style ={styles.categoryViewHeader}> 
                Grocery Tranactions
            </Text>

            <ScrollView nestedScrollEnabled={true}>
                <View style={{marginBottom:hp('5%'),backgroundColor:'white'}}>
                    {tempTransactions.map((item, index) => (
                    <Transaction key={index} item={item} delay={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default transactionsGroceries;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        color:'white'
    },
    categoryViewHeader: {
        textAlign: 'center',
        fontSize: hp('5%'),
        padding: hp('1%'),
        marginTop: hp('2%'),
        color: 'white',
    },
})
