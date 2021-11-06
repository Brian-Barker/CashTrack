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
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 54,
            height: 54,
            borderRadius: 10,
            backgroundColor: '#407565',
            //backgroundColor: '#002B19', //Highland
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
                    backgroundColor: '#002B19', //Highland
                    borderTopLeftRadius: hp('1.5%'),
                    borderTopRightRadius: hp('1.5%'),
                    height: hp('10%'),
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? 'white' : '#002B19'}}>
                        <Image
                            source={require('../../assets/icons/Home.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? 'white' : '#BABABA',
                            }}
                        />
                        <Text style={{color: focused ? 'white' : '#BABABA', fontSize: hp('2%')}}>
                            Home 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Section" component={CategoriesScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? 'white' : '#002B19'}}>
                        <Image
                            source={require('../../assets/icons/Categories.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? 'white' : '#BABABA',
                            }}
                        />
                        <Text style={{color: focused ? 'white' : '#BABABA', fontSize: hp('2%')}}>
                            Section 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Add" component={AddPurchaseScreen} options={{
                tabBarIcon: ({focused}) => (
                    <Image
                        source={require('../../assets/icons/Add.png')}
                        resizeMode = 'contain'
                        style={{
                            width: wp('8.5%'),
                            height: wp('8.5%'),
                            tintColor: focused ? 'white' : '#BABABA',
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <AddPurchaseTabButton {...props} />
                )
            }}/>

            <Tab.Screen name="Goal" component={GoalScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? 'white' : '#002B19'}}>
                        <Image
                            source={require('../../assets/icons/Goal.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? 'white' : '#BABABA',
                            }}
                        />
                        <Text style={{color: focused ? 'white' : '#BABABA', fontSize: hp('2%')}}>
                            Goal 
                        </Text>
                    </View>
                ),
            }}/>

            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, borderBottomWidth: 1.5, borderColor: focused ? 'white' : '#002B19'}}>
                        <Image
                            source={require('../../assets/icons/Settings.png')}
                            resizeMode = 'contain'
                            style={{
                                width: wp('8%'),
                                height: wp('8%'),
                                tintColor: focused ? 'white' : '#BABABA',
                            }}
                        />
                        <Text style={{color: focused ? 'white' : '#BABABA', fontSize: hp('2%')}}>
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