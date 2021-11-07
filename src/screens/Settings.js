import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Settings = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* <Text>Settings</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            /> */}


            <TouchableOpacity style={{paddingTop: hp('79%')}}>
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
})
