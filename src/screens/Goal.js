import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

const Goal = ({navigation}) => {
    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.goalHeader}>
                Monthly Overview
            </Text>

            <Text style={styles.goalSubHeader}>
                Monthly Limit
            </Text>
            <Text style={styles.goalMoney}>
               $2000.00
            </Text>

            <Text style={styles.goalSubHeader}>
                Remaining Balance
            </Text>
            <Text style={styles.goalMoney}>
               $423.52
            </Text>

            <Text style={styles.goalSubHeader}>
                Total CashTrack Savings
            </Text>
            <Text style={styles.goalMoney}>
               $63.17
            </Text>

            <Text style={styles.goalSubHeader}>
                Highest Monthly Expense
            </Text>
            <Text style={styles.goalMoney}>
               Groceries
            </Text>

            <Text style={styles.goalSubHeader}>
                Saver Rank
            </Text>
            <Text style={styles.goalMoney}>
               Broke AF
            </Text>

            {/* <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            /> */}
            </ScrollView>
        </View>
    )
}

export default Goal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'black'
    },
    goalHeader: {
        textAlign: 'center',
        fontSize: 36,
        padding: 16,
        marginTop: 8,
        color: 'white',
        paddingBottom: 20,
    },
    goalSubHeader: {
        textAlign: 'center',
        fontSize: 24,
        padding: 0,
        marginTop: 8,
        color: 'white',
    },
    goalMoney: {
        textAlign: 'center',
        fontSize: 30,
        padding: 0,
        marginTop: 16,
        color: '#32CD32',
        paddingBottom: 30,
    },
})
