import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from 'react-native-reanimated';

const Goal = ({navigation}) => {
    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
            {/* <Text style={styles.goalHeader}>
                Monthly Overview
            </Text> */}

            <Animated.View style={styles.subSectionsContainer}>
                <Text style={styles.goalSubHeader}>
                    Monthly Limit
                </Text>
                <Text style={styles.goalMoney}>
                    $2000.00
                </Text>
            </Animated.View>

            <Animated.View style={styles.subSectionsContainer}>
                <Text style={styles.goalSubHeader}>
                    Remaining Balance
                </Text>
                <Text style={styles.goalMoney}>
                $423.52
                </Text>
            </Animated.View>

            <Animated.View style={styles.subSectionsContainer}>
                <Text style={styles.goalSubHeader}>
                    Total CashTrack Savings
                </Text>
                <Text style={styles.goalMoney}>
                $63.17
                </Text>
            </Animated.View>

            <Animated.View style={styles.subSectionsContainer}>
                <Text style={styles.goalSubHeader}>
                    Highest Monthly Expense
                </Text>
                <Text style={styles.goalMoney}>
                Groceries
                </Text>
            </Animated.View>

            <Animated.View style={styles.subSectionsContainer}>
                <Text style={styles.goalSubHeader}>
                    Saver Rank
                </Text>
                <Text style={styles.goalMoney}>
                Broke
                </Text>
            </Animated.View>

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#002B19' //Highland
        backgroundColor: '#d8ede6', //SpringMint
        //backgroundColor: 'white'
    },
    goalHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: 36,
        padding: 16,
        marginTop: 8,
        color: 'white',
        paddingBottom: 20,
    },
    goalSubHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3%'),
        padding: 0,
        marginTop: hp('1%'),
        color: 'white',
    },
    goalMoney: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
        // color: '#32CD32',
        fontSize:hp('3%'),
        color: 'white',
        //backgroundColor:'#407565',
        height:hp('6%'),
        width:wp('80%'),
        borderRadius:hp('0.5%'),
        paddingTop:hp('1%'),
    },
    subSectionsContainer: {
        alignItems:'center',
        height:hp('13%'),
        width:wp('85%'),
        backgroundColor:'#407565',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        paddingTop:hp('2.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
})
