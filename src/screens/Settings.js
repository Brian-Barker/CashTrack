import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from 'react-native-reanimated';


const Settings = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* <Text>Settings</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            /> */}

            <Animated.View style={styles.profilePicContainer}>
                <Text style={styles.profilePicText}>
                    CT
                </Text>
            </Animated.View>

            <Animated.View style={styles.changePassContainer}>
                <TouchableOpacity style={{paddingTop: hp('1%')}}>
                    <Text style={styles.changePassText}>
                        Change Password         >
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.placehold1Container}>
                <TouchableOpacity style={{paddingTop: hp('1%')}}>
                    <Text style={styles.placehold1Text}>
                        Placehold 1                 >
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={styles.placehold2Container}>
                <TouchableOpacity style={{paddingTop: hp('1%')}}>
                    <Text style={styles.placehold2Text}>
                        Placehold 2                 >
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={{paddingTop: hp('3%')}}>
                <Text 
                    style={{
                        fontFamily: 'PierSans-Regular',
                        fontSize: hp('2.5%'),
                        backgroundColor: '#407565', 
                        textAlign: 'center',
                        color: 'white',
                        height: hp('6%'),
                        width: wp('80%'),
                        borderRadius: hp('1.5%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: hp('1.5%'),
                    }}         
                    onPress={() => alert('Signed Out!')}
                    >  
                    Log Out
                </Text>
            </TouchableOpacity>

        </View>

        
    )
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#002B19' //Highland
        backgroundColor: '#d8ede6', //SpringMint
        //backgroundColor: 'white'
    },
    profilePicContainer: {
        alignItems:'center',
        height:hp('15%'),
        width:hp('15%'),
        backgroundColor: '#407565',
        justifyContent:'center',
        borderRadius:hp('10%'),
        marginTop:hp('5%'),
        marginBottom:hp('6.5%'),
    },
    profilePicText: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        // color: '#32CD32',
        fontSize:hp('5%'),
        color: 'white',
        //backgroundColor:'#407565',
        borderRadius:hp('0.5%'),
    },
    changePassContainer: {
        alignItems:'center',
        height:hp('12%'),
        width:wp('85%'),
        backgroundColor:'white',
        justifyContent:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
    changePassText: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        // color: '#32CD32',
        fontSize:hp('3%'),
        color: '#407565',
        //backgroundColor:'#407565',
        borderRadius:hp('0.5%'),
    },
    placehold1Container: {
        alignItems:'center',
        height:hp('12%'),
        width:wp('85%'),
        backgroundColor:'white',
        justifyContent:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
    placehold1Text: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        // color: '#32CD32',
        fontSize:hp('3%'),
        color: '#407565',
        //backgroundColor:'#407565',
        borderRadius:hp('0.5%'),
    },
    placehold2Container: {
        alignItems:'center',
        height:hp('12%'),
        width:wp('85%'),
        backgroundColor:'white',
        justifyContent:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
    placehold2Text: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        // color: '#32CD32',
        fontSize:hp('3%'),
        color: '#407565',
        //backgroundColor:'#407565',
        borderRadius:hp('0.5%'),
    },
})
