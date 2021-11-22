import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import styles from '../styles';
import {Dimensions, StatusBar, TextInput, TouchableOpacity,View,Text} from 'react-native';
import {fetchUserToken, loginUser} from '../apis/Backend';
const {height, width} = Dimensions.get('window');


const Register = ({navigation}) =>
{
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [firstname,setFirstName] = useState('');
    let [lastname,setLastName] = useState('');
    let [email,setEmail] = useState('');

    return (
        <Animated.View style={{flex:1,justifyContent:'flex-start',backgroundColor: '#407565',alignItems:'center'}}>
        <Animated.View>
            <Animated.Text style={{color:'white',fontSize:hp('4%')}}>
                Register
            </Animated.Text>
        </Animated.View>

        <Animated.View style={{marginTop:hp('5%')}}>
            <Animated.View>
                <Text style={{marginLeft:20,color:'white'}}>
                    First Name
                </Text>
                <TextInput
                onChangeText={text => setFirstName(text)}
                style={{
                    height: height * 0.07,
                    width: width * 0.7,
                    margin: 6,
                    // borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'white',
                    paddingHorizontal: 20,
                    color: '#002b19',
                    fontSize: 16,
                    backgroundColor: 'white',
                }}
                placeholder={'Your First Name'}
                placeholderTextColor="#BBBBBB"
                />
                <Text style={{marginLeft:20,color:'white'}}>
                    Last Name
                </Text>
                <TextInput
                onChangeText={text => setLastName(text)}
                style={{
                    height: height * 0.07,
                    width: width * 0.7,
                    margin: 6,
                    // borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'white',
                    paddingHorizontal: 20,
                    color: '#002b19',
                    fontSize: 16,
                    backgroundColor: 'white',
                }}
                placeholder={'Your Last Name'}
                placeholderTextColor="#BBBBBB"
                />
                <Text style={{marginLeft:20,color:'white'}}>
                    Username
                </Text>
                <TextInput
                onChangeText={text => setUsername(text)}
                style={{
                    height: height * 0.07,
                    width: width * 0.7,
                    margin: 6,
                    // borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'white',
                    paddingHorizontal: 20,
                    color: '#002b19',
                    fontSize: 16,
                    backgroundColor: 'white',
                }}
                placeholder={'Your Username'}
                placeholderTextColor="#BBBBBB"
                />
                
                <Text style={{marginLeft:20,color:'white'}}>
                    Email
                </Text>
                <TextInput
                onChangeText={text => setEmail(text)}
                style={{
                    height: height * 0.07,
                    width: width * 0.7,
                    margin: 6,
                    // borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'white',
                    paddingHorizontal: 20,
                    color: '#002b19',
                    fontSize: 16,
                    backgroundColor: 'white',
                }}
                placeholder={'Your Email'}
                placeholderTextColor="#BBBBBB"
                />

                <Text style={{marginLeft:20,color:'white'}}>
                    Password
                </Text>
                <TextInput
                onChangeText={text => setPassword(text)}
                style={{
                    height: height * 0.07,
                    width: width * 0.7,
                    margin: 6,
                    // borderWidth: 1,
                    borderRadius: 15,
                    borderColor: 'white',
                    paddingHorizontal: 20,
                    color: '#002b19',
                    fontSize: 16,
                    backgroundColor: 'white',
                }}
                placeholder={'Your Password'}
                placeholderTextColor="#BBBBBB"
                />


        <TouchableOpacity
          onPress={ () => {navigation.navigate('BudgetConfig') }
          }
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.07,
            width: width * 0.7,
            marginTop: 24,
            marginBottom: 6,
            borderRadius: 15,
            backgroundColor: '#002b19',
          }}>
          <Animated.Text style={{color: 'white', fontSize: 20}}>
            Register
          </Animated.Text>
          </TouchableOpacity>




        </Animated.View>
        </Animated.View>
        </Animated.View>
    )
}

export default Register;