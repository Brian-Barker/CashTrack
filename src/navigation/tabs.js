import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/Home';
import CategoriesScreen from '../screens/Categories';
import SettingsScreen from '../screens/Settings';
import AddPurchaseScreen from '../screens/AddPurchase';
import GoalScreen from '../screens/Goal';
import GroceriesScreen from '../screens/PurhcasesByCategory/TransactionsGroceries';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from '../styles';
// import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const Tab = createBottomTabNavigator();

const AddPurchaseTabButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        top: hp('0%'),
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: hp('6.75%'),
            height: hp('6.75%'),
            borderRadius: hp('5%'),
            // borderWidth: hp('0.2%'),
            // borderColor: 'black',
            backgroundColor: '#407565',
            //backgroundColor: 'white',
            //backgroundColor: '#002B19', //Highland
            //backgroundColor: '#d8ede6', //SpringMint
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return(
        <Tab.Navigator 
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    //backgroundColor: '#407565',
                    //backgroundColor: '#002B19', //Highland
                    //backgroundColor: '#d8ede6', //SpringMint
                    //backgroundColor: '#E5FAF3',
                    backgroundColor: 'white',
                    borderTopLeftRadius: hp('1.5%'),
                    borderTopRightRadius: hp('1.5%'),
                    height: hp('10%'),
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? '#002B19' : '#d8ede6'}}>
                        <Image
                            source={require('../../assets/icons/Home.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? '#002B19' : '#949494',
                            }}
                        />
                        <Text style={{color: focused ? '#002B19' : '#949494', fontSize: hp('2%')}}>
                            Home 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Section" component={CategoriesScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? '#002B19' : '#d8ede6'}}>
                        <Image
                            source={require('../../assets/icons/Categories.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? '#002B19' : '#949494',
                            }}
                        />
                        <Text style={{color: focused ? '#002B19' : '#949494', fontSize: hp('2%')}}>
                            Section 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Add" component={AddPurchaseScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0,  width: wp('16%'), height: wp('16%'), borderWidth: 2, borderRadius: hp('5%'), borderColor: focused ? '#002B19' : '#d8ede6'}}>
                        <Image
                            source={require('../../assets/icons/CashTrackLogo.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('12%'),
                                height: wp('12%'),
                                tintColor: focused ? 'white' : '#BABABA',
                                //tintColor: 'white',
                            }}
                        />
                    </View>
                ),
                tabBarButton: (props) => (
                    <AddPurchaseTabButton {...props} />
                )
            }}/>

            <Tab.Screen name="Goal" component={GoalScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? '#002B19' : '#d8ede6'}}>
                        <Image
                            source={require('../../assets/icons/Goal.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? '#002B19' : '#949494',
                            }}
                        />
                        <Text style={{color: focused ? '#002B19' : '#949494', fontSize: hp('2%')}}>
                            Goal 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? '#002B19' : '#d8ede6'}}>
                        <Image
                            source={require('../../assets/icons/Settings.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? '#002B19' : '#949494',
                            }}
                        />
                        <Text style={{color: focused ? '#002B19' : '#949494', fontSize: hp('2%')}}>
                            Settings 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="transactionsGroceries" component={GroceriesScreen} options={{
                tabBarButton: () => null,
                tabBarVisibility: false,
            }}/>

        </Tab.Navigator>
    );
}

const style = StyleSheet.create ({
    shadow: {
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;