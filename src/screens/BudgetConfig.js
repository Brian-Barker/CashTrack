import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
//import styles from '../styles';
import {Dimensions, StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {fetchUserToken, loginUser} from '../apis/Backend';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
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
        <Animated.View style={styles.container}>

            <Text style={styles.BudgetHeaderText}>
                Budget Setup
            </Text>

            <Animated.View style = {styles.ContentContainer}>
                <Animated.View style = {styles.BudgetInputContainer}>
                    
                    <TextInput style = {styles.BudgetInputText}
                        placeholder="Enter Budget for Month"
                        placeholderTextColor="#407565"
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

                <Animated.View style = {styles.SliderContainer}>
                    <Animated.View style={styles.SliderCategoryContainer}>
                        <Animated.Text style={styles.SliderCategoryHeaderText}>
                            Groceries
                        </Animated.Text>

                        <Animated.Text style={styles.SliderCategoryAmountText}>
                            {((firstValue)).toFixed(2)}
                        </Animated.Text>
                    </Animated.View>
                    
                    <Slider
                        onValueChange = {value=> {setFirstValue(value)}}
                        value = {firstValue}
                        style={styles.SliderDesign}
                        minimumValue={0}
                        maximumValue={(budget)-(diningValue+otherValue+transitValue)}
                        minimumTrackTintColor="#002B19"
                        maximumTrackTintColor="#000000"
                        step={5}
                    />
                    

                    <Animated.View style={styles.SliderCategoryContainer}>
                        <Animated.Text style={styles.SliderCategoryHeaderText}>
                            Transit
                        </Animated.Text>
                        <Animated.Text style={styles.SliderCategoryAmountText}>
                            {((transitValue)).toFixed(2)}
                        </Animated.Text>
                    </Animated.View>

                    <Slider
                        onValueChange = {value=> {setTransitValue(value)}}
                        value = {transitValue}
                        style={styles.SliderDesign}
                        minimumValue={0}
                        maximumValue={(budget)-(firstValue+diningValue+otherValue)}
                        minimumTrackTintColor="#002B19"
                        maximumTrackTintColor="#000000"
                        step={5}
                    />
                    

                    <Animated.View style={styles.SliderCategoryContainer}>
                        <Animated.Text style={styles.SliderCategoryHeaderText}>
                            Dining
                        </Animated.Text>
                        <Animated.Text style={styles.SliderCategoryAmountText}>
                            {((diningValue)).toFixed(2)}
                        </Animated.Text>
                    </Animated.View>

                    <Slider
                        onValueChange = {value=> {setDiningValue(value)}}
                        value = {diningValue}
                        style={styles.SliderDesign}
                        minimumValue={0}
                        maximumValue={(budget)-(firstValue+transitValue+otherValue)}
                        minimumTrackTintColor="#002B19"
                        maximumTrackTintColor="#000000"
                        step={5}
                    />
                    

                    <Animated.View style={styles.SliderCategoryContainer}>
                        <Animated.Text style={styles.SliderCategoryHeaderText}>
                            Other
                        </Animated.Text>
                        <Animated.Text style={styles.SliderCategoryAmountText}>
                            {((otherValue)).toFixed(2)}
                        </Animated.Text>
                    </Animated.View>

                    <Slider
                        onValueChange = {value=> {setOtherValue(value)}}
                        value = {otherValue}
                        style={styles.SliderDesign}
                        minimumValue={0}
                        maximumValue={(budget)-(diningValue+firstValue+transitValue)}
                        minimumTrackTintColor="#002B19"
                        maximumTrackTintColor="#000000"
                        step={5}
                    />

                </Animated.View>

                <Animated.View style={styles.RemainingUnallocatedContainer}>
                    <Animated.Text style={styles.RemainingUnallocatedText}>
                        Unallocated Cash:
                    </Animated.Text>
                    <Animated.Text style={styles.RemainingUnallocatedAmountText}>
                        {((budget)-(diningValue+firstValue+transitValue+otherValue)).toFixed(2)}
                    </Animated.Text>
                </Animated.View>
            </Animated.View>

            <Animated.View>
                <TouchableOpacity
                    onPress={()=> console.log(firstValue,transitValue,diningValue,otherValue)}
                    style={styles.SubmitButtonContainer}>
                    <Animated.Text style={styles.SubmitButtonText}>
                        Submit
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>

        </Animated.View>
    )

}
export default BudgetConfig;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#002B19' //Highland
        //backgroundColor: '#d8ede6', //SpringMint
        //backgroundColor: '#E5FAF3',
        //backgroundColor: 'white'
        backgroundColor: '#407565',
    },
    ContentContainer:{
        height:hp('62%'),
        width:wp('85%'),
        alignItems: 'center',
        borderRadius:hp('1.5%'),
        backgroundColor: '#E5FAF3',
        marginTop: hp('3%'),
        marginBottom: hp('1%'),
    },
    BudgetInputContainer: {
        //backgroundColor:'#E5FAF3',
        marginTop:hp('1%'),
    },
    BudgetHeaderText: {
        color: 'white',
        fontSize: hp('4%'),
        alignSelf:'center',
        marginTop:hp('3%'),
    },
    BudgetInputText: {
        fontSize:hp('2.5%'),
        height:hp('7%'),
        width:wp('80%'),
        backgroundColor:'#E5FAF3',
        marginTop:hp('1%'),
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        borderWidth: hp('0.25%'),
        borderColor: '#002B19', //Highland
    },
    SliderContainer: {
        marginTop:hp('3%'),
        backgroundColor:'#E5FAF3',
        borderRadius:hp('1.5%'),
        height:hp('45%'),
        width:wp('85%'),
    },
    SliderCategoryContainer: {
        flexDirection: 'row',
        marginTop:hp('1.5%'),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    SliderCategoryHeaderText: {
        fontSize:hp('3%'),
        alignSelf:'center',
        color: '#002B19', //Highland
        marginLeft: wp('3%'),
    },
    SliderCategoryAmountText: {
        fontSize:hp('3%'),
        alignSelf:'center',
        color:'#407565',
        marginRight: wp('5%'),
    },
    SliderDesign: {
        width: wp('82%'),
        height: hp('4.5%'),
        alignSelf: 'center',
    },
    RemainingUnallocatedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    RemainingUnallocatedText: {
        fontSize:hp('2.5%'),
        color: '#002B19', //Highland
    },
    RemainingUnallocatedAmountText: {
        fontSize:hp('3%'),
        alignSelf:'center',
        color:'#407565',
        marginLeft: hp('3%'),
    },
    SubmitButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.07,
        width: width * 0.8,
        marginTop: hp('3%'),
        // marginBottom: 6,
        borderRadius:hp('1.5%'),
        backgroundColor: '#002B19', //Highland
    },
    SubmitButtonText: {
        color: 'white',
        fontSize: 20,
    },
});