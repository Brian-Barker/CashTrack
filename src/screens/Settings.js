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


            <TouchableOpacity style={{paddingTop: hp('80%')}}>
                <Text 
                    style={{
                        fontFamily: 'PierSans-Regular',
                        fontSize: 18,
                        backgroundColor: '#407565', 
                        textAlign: 'center',
                        color: 'white',
                        height: 50,
                        width: 300,
                        borderRadius: 10,
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
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#002B19'
    },
})
