import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

import Transaction from '../../components/Transaction';

let tempTransactions = [
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
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  ];


const transactionsGroceries = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style ={styles.categoryViewHeader}> 
                Grocery Tranactions
            </Text>

            <ScrollView nestedScrollEnabled={true}>
                <View style={{marginBottom: 60}}>
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
        backgroundColor: 'black'
    },
    categoryViewHeader: {
        textAlign: 'center',
        fontSize: 28,
        padding: 16,
        marginTop: 16,
        color: 'white',
    },
})
