import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Settings = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* <Text>Settings</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            /> */}


            <TouchableOpacity style={{paddingTop: 650}}>
                <Text 
                    style={{
                        fontSize: 18,
                        backgroundColor: '#03A608', 
                        textAlign: 'center',
                        color: 'white',
                        height: 50,
                        width: 300,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 14,
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
        backgroundColor: 'black'
    },
})