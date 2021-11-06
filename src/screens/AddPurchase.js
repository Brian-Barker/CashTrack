import React from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker'
import { withTheme } from "react-native-elements";
import Animated from "react-native-reanimated";

const AddPurchase = ({navigation}) => {

    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Select Category");

    return (
        <View style={styles.container}>

            <Animated.View style={styles.addPurchaseContainer}>
            <Text style={styles.addPurchaseHeader}>
                Add A Purchase
            </Text>
            <Text style={styles.addPurchaseSubHeader}>
                Company Name
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter Company Name"
                keyboardType="default"
            />


            <Text style={styles.addPurchaseSubHeader}>
                Category
            </Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Dining" value="dining" />
                <Picker.Item label="Shopping" value="shopping" />
                <Picker.Item label="Transport" value="transport" />
                <Picker.Item label="Travel" value="travel" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Insurance" value="insurance" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Finance" value="finance" />
                <Picker.Item label="Fun-Money" value="funMoney" />
            </Picker>


            <Text style={styles.addPurchaseSubHeader}>
                Purchase Amount
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Purchase Amount"
                keyboardType="numeric"
            />


            <TouchableOpacity style={styles.submitContainer} onPress={() => alert('Your Purchase Has Been Added!')}>
                <Text style={styles.submitText}>  
                    Submit
                </Text>
            </TouchableOpacity>
        
            </Animated.View>

        </View>
    )
}

export default AddPurchase;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: '#002B19', //Highland
        backgroundColor: '#d8ede6', //SpringMint
        //backgroundColor: 'white'
        paddingTop: hp('7%'),
    },
    addPurchaseContainer: {
        alignItems:'center',
        height:hp('70'),
        width:wp('85%'),
        backgroundColor:'#407565',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
    addPurchaseHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3.5%'),
        padding: hp('1.5%'),
        marginTop: hp('1%'),
        color: 'white',
        paddingBottom: hp('3%'),
    },
    addPurchaseSubHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    input: {
        fontFamily: 'PierSans-Regular',
        height: hp('6%'),
        width: wp('75%'),
        margin: hp('1%'),
        padding: hp('2%'),
        color: 'black',
        borderRadius: hp('1.5%'),
        backgroundColor: 'white'
    },
    submitContainer: {
        justifyContent: "center",
        fontSize: hp('2%'),
        alignItems: "center",
        backgroundColor: '#002B19',
        height: hp('7%'),
        width: wp('75%'),
        borderRadius: hp('2%'),
        marginTop: hp('5%')
    },
    submitText: {
        fontFamily: 'PierSans-Regular',
        fontSize: hp('2.5%'),
        //backgroundColor: '#03A608', 
        textAlign: 'center',
        color: 'white',
        // textAlign:'center'
    }
})
