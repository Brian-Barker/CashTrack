import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import styles from '../styles';
import {Dimensions, StatusBar, TextInput, TouchableOpacity,Alert,Button,Text,View} from 'react-native';
import {fetchUserToken, loginUser} from '../apis/Backend';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Slider from '@react-native-community/slider';
import { watchPosition } from 'react-native-geolocation-service';
const {height, width} = Dimensions.get('window');
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const BudgetConfig = ({navigation}) => 
{
    const [budget,setBudget] = useState(0);
    const [reminaingBal,setRemainingBal] = useState(0);
    //these are the values for 
    const [firstValue,setFirstValue] = useState(0);
    const [transitValue,setTransitValue] = useState(0);
    const [diningValue,setDiningValue] = useState(0);
    const [otherValue,setOtherValue] = useState(0);


    return(
        <Animated.View style={{flex:1, justifyContent:'flex-start',alignItems:'center',alignContent:'center',backgroundColor:'#407565'}}>

            <Animated.View style = {{marginTop:hp('3%')}}>
            <Text style={{color:'white',fontSize:heightPercentageToDP('4%'),alignSelf:'center'}}>
                Budget Setup
            </Text>
            <TextInput style = 
            {{fontSize:hp('2.5%'),height:hp('7%'),width:wp('50%'),borderWidth:0.5, backgroundColor:'white',marginTop:hp('2%'),alignSelf:'center',borderRadius:10}}
            placeholder="Enter Budget for Month"
            keyboardType='numeric'
            textAlign={'center'}
            onChangeText={(text)=>{setBudget(text)
            setFirstValue(0)
            setOtherValue(0)
            setDiningValue(0)
            setTransitValue(0)
            setRemainingBal(text)}}>

            </TextInput>
            </Animated.View>
            <Animated.View style = {{marginTop:hp('2%'),backgroundColor:'#002B19',borderRadius:10,width:wp('80%')}}>
            <Animated.View style={{marginTop:hp('2%')}}>
                <Animated.Text style={{fontSize:hp('5%'),alignSelf:'center',color:'white'}}>
                    Groceries
                </Animated.Text>
                <Animated.Text style={{fontSize:hp('3%'),alignSelf:'center',color:'#407565'}}>

                    {((firstValue)).toFixed(2)}
                </Animated.Text>
                <Slider
                onValueChange = {value=> {setFirstValue(value)}}
                value = {firstValue}
                style={{width: wp('80%'), height: 40}}
                minimumValue={0}
                maximumValue={(budget)-(diningValue+otherValue+transitValue)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={5}
                />
            </Animated.View>

            <Animated.View style={{marginTop:hp('2%')}}>
                <Animated.Text style={{fontSize:hp('5%'),alignSelf:'center',color:'white'}}>
                    Transit
                </Animated.Text>
                <Animated.Text style={{fontSize:hp('3%'),alignSelf:'center',color:'#407565'}}>

                    {((transitValue)).toFixed(2)}
                </Animated.Text>
                <Slider
                onValueChange = {value=> {setTransitValue(value)}}
                value = {transitValue}
                style={{width: wp('80%'), height: 40}}
                minimumValue={0}
                maximumValue={(budget)-(firstValue+diningValue+otherValue)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={5}
                />
            </Animated.View>

            
            <Animated.View style={{marginTop:hp('2%')}}>
                <Animated.Text style={{fontSize:hp('5%'),alignSelf:'center',color:'white'}}>
                    Dining
                </Animated.Text>
                <Animated.Text style={{fontSize:hp('3%'),alignSelf:'center',color:'#407565'}}>

                    {((diningValue)).toFixed(2)}
                </Animated.Text>
                <Slider
                onValueChange = {value=> {setDiningValue(value)}}
                value = {diningValue}
                style={{width: wp('80%'), height: 40}}
                minimumValue={0}
                maximumValue={(budget)-(firstValue+transitValue+otherValue)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={5}
                />
            </Animated.View>

            <Animated.View style={{marginTop:hp('2%')}}>
                <Animated.Text style={{fontSize:hp('5%'),alignSelf:'center',color:'white'}}>
                    Other
                </Animated.Text>
                <Animated.Text style={{fontSize:hp('3%'),alignSelf:'center',color:'#407565'}}>

                    {((otherValue)).toFixed(2)}
                </Animated.Text>
                <Slider
                onValueChange = {value=> {setOtherValue(value)}}
                value = {otherValue}
                style={{width: wp('80%'), height: 40}}
                minimumValue={0}
                maximumValue={(budget)-(diningValue+firstValue+transitValue)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                step={5}
                />
            </Animated.View>
        
            </Animated.View>
        <Animated.View>
        <TouchableOpacity
          onPress={()=> console.log(firstValue,transitValue,diningValue,otherValue)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.07,
            width: width * 0.8,
            marginTop: 24,
            marginBottom: 6,
            borderRadius: 15,
            backgroundColor: '#002b19',
          }}>
          <Animated.Text style={{color: 'white', fontSize: 20}}>
            Submit
          </Animated.Text>
        </TouchableOpacity>
        </Animated.View>











        </Animated.View>
    )




}
export default BudgetConfig;